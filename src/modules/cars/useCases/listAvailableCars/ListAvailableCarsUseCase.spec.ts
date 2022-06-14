import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("ListAvailableCarsUseCase", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    await carsRepositoryInMemory.create({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Volkswagen",
      category_id: "category_id",
    });

    await carsRepositoryInMemory.create({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Volkswagen",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toHaveLength(2);
  });

  it("should be able to list all available cars by name", async () => {
    await carsRepositoryInMemory.create({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Volkswagen",
      category_id: "category_id",
    });

    await carsRepositoryInMemory.create({
      name: "Celta",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Volkswagen",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Fusca",
    });

    expect(cars).toHaveLength(1);
  });

  it("should be able to list all available cars by category", async () => {
    await carsRepositoryInMemory.create({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Volkswagen",
      category_id: "category_id_01",
    });

    await carsRepositoryInMemory.create({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Volkswagen",
      category_id: "category_id_02",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category_id_01",
    });

    expect(cars).toHaveLength(1);
  });

  it("should be able to list all available cars by brand", async () => {
    await carsRepositoryInMemory.create({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Volkswagen",
      category_id: "category_id_01",
    });

    await carsRepositoryInMemory.create({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Fiat",
      category_id: "category_id_01",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Volkswagen",
    });

    expect(cars).toHaveLength(1);
  });
});
