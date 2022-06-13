import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("CreateCarUseCase", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should be able to create a new car with availability true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "category",
    });

    expect(car.availability).toBe(true);
  });

  it("should not be able to create a new car with the same license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Fusca",
        description: "Carro de luxo",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 10,
        brand: "VW",
        category_id: "category",
      });

      await createCarUseCase.execute({
        name: "Celta",
        description: "Carro de luxo",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 10,
        brand: "VW",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
