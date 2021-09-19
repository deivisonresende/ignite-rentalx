import { Car } from "@modules/cars/infra/typeorm/entities/Cars";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { AppError } from "@shared/errors/AppErrors";

import { CreateCarUseCase } from "./createCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  const car = new Car();
  Object.assign(car, {
    name: "Name car",
    description: "Description car",
    daily_rate: 100,
    license_plate: "ABC-1234",
    fine_amount: 60,
    brand: "Brand",
    category_id: "Category",
  });

  it("Should be able create to create a new car", async () => {
    await createCarUseCase.execute(car);
  });
  it("Shouldn't not be able to create a car with same license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute(car);
      await createCarUseCase.execute(car);
    }).rejects.toBeInstanceOf(AppError);
  });
  it("Should be able to create a car with available true by default", async () => {
    await createCarUseCase.execute(car);
    expect(car.available).toBe(true || null);
  });
});
