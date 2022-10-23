import { ListAvailableCarsUseCase } from "@modules/cars/useCases/listAvailableCars/listAvailableCarsUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllCarsUseCase = container.resolve(ListAvailableCarsUseCase);
    const { brand, name, category_id } = request.query;
    const allCars = await listAllCarsUseCase.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string,
    });
    return response.status(200).send(allCars);
  }
}
