import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAllUsersUseCase } from "./listAllUsersUseCase";

export class ListAllUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllUsersUseCase = container.resolve(ListAllUsersUseCase);
    const users = await listAllUsersUseCase.execute();

    return response.status(200).json(users);
  }
}
