import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppErrors";

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}
  async execute(data: ICreateCarDTO): Promise<void> {
    const carAlreadyExists = await this.carsRepository.findByLicensePLate(
      data.license_plate
    );

    if (carAlreadyExists) {
      throw new AppError("Car already exists");
    }
    this.carsRepository.create(data);
  }
}
