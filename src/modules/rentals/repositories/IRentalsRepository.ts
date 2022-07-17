import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

export interface IRentalsRepository {
  findOpenRentalByUser(car_id: string): Promise<Rental>;
  findOpenRentalByCarId(user_id: string): Promise<Rental>;
  create({ ...data }: ICreateRentalDTO): Promise<Rental>;
}
