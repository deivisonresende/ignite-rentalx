import { Car } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

export interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute(filters: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(filters);
    return cars;
  }
}
