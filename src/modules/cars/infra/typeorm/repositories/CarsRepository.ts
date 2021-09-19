import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";

import { Car } from "../entities/Cars";

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;
  constructor() {
    this.repository = getRepository(Car);
  }
  async list(): Promise<Car[]> {
    const allCars = await this.repository.find({ available: true });
    return allCars;
  }
  async findByLicensePLate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });
    return car;
  }
  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data);
    this.repository.save(car);
    return car;
  }
}
