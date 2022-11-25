import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetPasswordUseCase } from "./resetPasswordUseCase";

class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;

    const resetPasswordUserUseCase = container.resolve(ResetPasswordUseCase);

    await resetPasswordUserUseCase.execute({
      token: token as string,
      password,
    });

    return response.send();
  }
}

export { ResetPasswordController };
