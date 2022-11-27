import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IEnvProvider } from "@shared/container/providers/EnvProvider/IEnvProvider";
import { AppError } from "@shared/errors/AppErrors";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("EnvProvider")
    private envProvider: IEnvProvider,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(
      token,
      this.envProvider.get("REFRESH_TOKEN_SECRET")
    ) as IPayload;

    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) throw new AppError("Refresh token does not exist");

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign(
      { email },
      this.envProvider.get("REFRESH_TOKEN_SECRET"),
      {
        subject: sub,
        expiresIn: this.envProvider.get("expire_refresh_token_time"),
      }
    );

    await this.usersTokensRepository.create({
      user_id,
      refresh_token,
      expires_date: this.dateProvider.addDays(7),
    });

    const newToken = sign({}, this.envProvider.get("secret"), {
      subject: user_id,
      expiresIn: this.envProvider.get("expire_token_time"),
    });

    return { token: newToken, refresh_token };
  }
}

export { RefreshTokenUseCase };
