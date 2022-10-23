import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IEnvProvider } from "@shared/container/providers/EnvProvider/IEnvProvider";
import { AppError } from "@shared/errors/AppErrors";

import { IRequest, IResponse } from "./interfaces";

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("EnvProvider")
    private envProvider: IEnvProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new AppError("Email or password incorrect");

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new AppError("Email or password incorrect");

    const token = sign({}, this.envProvider.get("secret"), {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}
