import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IEnvProvider } from "@shared/container/providers/EnvProvider/IEnvProvider";
import { AppError } from "@shared/errors/AppErrors";

import { IRequest, IResponse } from "./interfaces";

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("EnvProvider")
    private envProvider: IEnvProvider,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new AppError("Email or password incorrect");

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new AppError("Email or password incorrect");

    const token = sign({}, this.envProvider.get("secret"), {
      subject: user.id,
      expiresIn: "15m",
    });

    const refresh_token = sign(
      { email },
      this.envProvider.get("refresh_token_secret"),
      {
        subject: user.id,
        expiresIn: "7d",
      }
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      expires_date: this.dateProvider.addDays(7),
      refresh_token,
    });

    const tokenReturn: IResponse = {
      token,
      refresh_token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}
