import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Cars";
import { IRequest } from "@modules/cars/useCases/listAvailableCars/listAvailableCarsUseCase";

import { ICarsRepository } from "../ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, data);
    this.cars.push(car);
    return car;
  }
  async findByLicensePLate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }
  async findAvailable(filters: IRequest): Promise<Car[]> {
    const { name, brand, category_id } = filters;
    const existsFilter = !!name || brand || category_id;

    const cars = this.cars
      .filter((car) => (car.available === true ? car : null))
      .filter((car) => {
        if (brand && car.brand === brand) {
          return car;
        }
        if (name && car.name === name) {
          return car;
        }
        if (category_id && car.category_id === category_id) {
          return car;
        }
        if (existsFilter) return null;
        return cars;
      });

    return cars;
  }
  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }
}
