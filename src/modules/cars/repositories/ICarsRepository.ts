import { IRequest } from "@modules/cars/useCases/listCars/listAllCarsUseCase";

import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Cars";

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePLate(license_plate: string): Promise<Car>;
  findAvailable(filters: IRequest): Promise<Car[]>;
}
