import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppErrors";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const minimum_daily = 1;

    const rental = await this.rentalsRepository.findById(id);
    if (!rental) throw new AppError("Rental does not exists");

    const car = await this.carsRepository.findById(rental.car_id);

    let daily = this.dateProvider.compare(
      rental.start_date,
      this.dateProvider.dateNow(),
      "days"
    );

    if (daily <= 0) daily = minimum_daily;

    const delay = this.dateProvider.compare(
      rental.expected_return_date,
      this.dateProvider.dateNow(),
      "days"
    );

    let total = 0;

    if (delay > 0) total = delay * car.fine_amount;

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };