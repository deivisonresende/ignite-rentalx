import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAllSpecificationsUseCase } from "./ListAllSpecificationsUseCase";

export class ListAllSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllSpecificationsUseCase = container.resolve(
      ListAllSpecificationsUseCase
    );
    const all = await listAllSpecificationsUseCase.execute();
    return response.json(all);
  }
}
