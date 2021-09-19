import { Car } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListAllCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}
  async execute(): Promise<Car[]> {
    const allCars = await this.carsRepository.list();
    return allCars;
  }
}
