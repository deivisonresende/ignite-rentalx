import { Car } from "@modules/cars/infra/typeorm/entities/Cars";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "@modules/rentals/useCases/createRental/createRentalUseCase";
import dayjs from "dayjs";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppErrors";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let car: Car;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(async () => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );

    car = await carsRepositoryInMemory.create({
      name: "fox",
      description: "1.6",
      daily_rate: 150,
      license_plate: "xxx",
      fine_amount: 150,
      brand: "VW",
      category_id: "brand",
    });
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    await createRentalUseCase.execute({
      user_id: "123",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: car.id,
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
