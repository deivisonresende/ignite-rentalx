import { Request, Response } from "express";

import { ListAllSpecificationsUseCase } from "./ListAllSpecificationsUseCase";

export class ListAllSpecificationsController {
  constructor(private listAllCategoriesUseCase: ListAllSpecificationsUseCase) {}
  handle(request: Request, response: Response): Response {
    const all = this.listAllCategoriesUseCase.execute();
    return response.json(all);
  }
}
