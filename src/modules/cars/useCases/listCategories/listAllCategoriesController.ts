import { Request, Response } from "express";

import { ListAllCategoriesUseCase } from "./listAllCategoriesUseCase";

export class ListAllCategoriesController {
  constructor(private listAllCategoriesUseCase: ListAllCategoriesUseCase) {}
  handle(request: Request, response: Response): Response {
    const all = this.listAllCategoriesUseCase.execute();
    return response.json(all);
  }
}
