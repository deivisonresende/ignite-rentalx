import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAllCategoriesUseCase } from "./listAllCategoriesUseCase";

export class ListAllCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllCategoriesUseCase = container.resolve(
      ListAllCategoriesUseCase
    );
    const all = await listAllCategoriesUseCase.execute();
    return response.json(all);
  }
}
