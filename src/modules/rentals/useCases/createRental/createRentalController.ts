import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalUseCase } from "./createRentalUseCase";

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      user: { id },
      body: { car_id, expected_return_date },
    } = request;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);
    const rental = await createRentalUseCase.execute({
      car_id,
      expected_return_date,
      user_id: id,
    });

    return response.status(201).json(rental);
  }
}

export { CreateRentalController };
