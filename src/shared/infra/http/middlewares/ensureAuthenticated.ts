import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { EnvProvider } from "@shared/container/providers/EnvProvider/implementations/EnvProvider";
import { AppError } from "@shared/errors/AppErrors";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  const userSTokensRepository = new UsersTokensRepository();
  const envProvider = new EnvProvider();

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      envProvider.get("REFRESH_TOKEN_SECRET")
    ) as IPayload;

    const user = await userSTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!user) throw new AppError("Invalid token", 401);

    request.user = {
      id: user_id,
    };
  } catch {
    throw new AppError("Invalid token", 401);
  }
  next();
}
