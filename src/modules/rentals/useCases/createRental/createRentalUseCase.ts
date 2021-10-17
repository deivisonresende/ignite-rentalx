import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { AppError } from "@shared/errors/AppErrors";

dayjs.extend(utc);

export class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}
  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const minimumHour = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCarId(
      car_id
    );
    if (carUnavailable) {
      throw new AppError("Car is unavailable");
    }
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );
    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user");
    }

    console.log("Data pela requisição: ", expected_return_date);
    const expectedReturnDateFormat = dayjs(expected_return_date)
      .utc()
      .local()
      .format();

    const dateNow = dayjs().utc().local().format();

    const compare = dayjs(expectedReturnDateFormat).diff(dateNow, "hours");

    if (compare < minimumHour) {
      throw new AppError("Invalid return time");
    }
    const rentalCreated = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });
    return rentalCreated;
  }
}
