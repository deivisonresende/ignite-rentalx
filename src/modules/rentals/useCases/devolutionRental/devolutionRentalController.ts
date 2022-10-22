import { Request, Response } from "express";
import { container } from "tsyringe";

import { DevolutionRentalUseCase } from "./devolutionRentalUseCase";

class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      user: { id: user_id },
      params: { id },
    } = request;

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

    const rental = await devolutionRentalUseCase.execute({
      id,
      user_id,
    });

    return response.status(200).json(rental);
  }
}

export { DevolutionRentalController };
