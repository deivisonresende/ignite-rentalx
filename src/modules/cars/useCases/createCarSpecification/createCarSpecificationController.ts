import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationUseCase } from "./createCarSpecificationUseCase";

export class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );
    const { id } = request.params;
    const { specification_ids } = request.body;

    const cars = await createCarSpecificationUseCase.execute({
      car_id: id,
      specifications_id: specification_ids,
    });

    return response.status(200).json(cars);
  }
}
