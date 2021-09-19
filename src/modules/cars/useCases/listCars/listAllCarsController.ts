import { ListAllCarsUseCase } from "@modules/cars/useCases/listCars/listAllCarsUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class ListAllCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllCarsUseCase = container.resolve(ListAllCarsUseCase);
    const allCars = await listAllCarsUseCase.execute();
    return response.status(200).send(allCars);
  }
}
