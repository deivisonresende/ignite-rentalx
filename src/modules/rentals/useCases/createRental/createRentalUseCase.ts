import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";

import { AppError } from "@shared/errors/AppErrors";

export class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}
  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<void> {
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
  }
}
