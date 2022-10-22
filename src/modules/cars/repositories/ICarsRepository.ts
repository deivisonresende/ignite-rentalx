import { IRequest } from "@modules/cars/useCases/listAvailableCars/listAvailableCarsUseCase";

import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Cars";

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePLate(license_plate: string): Promise<Car>;
  findAvailable(filters: IRequest): Promise<Car[]>;
  findById(id: string): Promise<Car>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}
