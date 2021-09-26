import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRequest } from "@modules/cars/useCases/listAvailableCars/listAvailableCarsUseCase";
import { getRepository, Repository } from "typeorm";

import { Car } from "../entities/Cars";

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;
  constructor() {
    this.repository = getRepository(Car);
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
  async findAvailable(filters: IRequest): Promise<Car[]> {
    const { brand, name, category_id } = filters;
    const carsQuery = await this.repository
      .createQueryBuilder("c")
      .where("c.available= :available", { available: true });

    if (brand) {
      carsQuery.andWhere("LOWER(c.brand) = LOWER(:brand)", { brand });
    }
    if (name) {
      carsQuery.andWhere("LOWER(c.name) = LOWER(:name)", { name });
    }
    if (category_id) {
      carsQuery.andWhere("LOWER(category_id) = :LOWER(category_id)", {
        category_id,
      });
    }
    const cars = await carsQuery.getMany();

    return cars;
  }
}
