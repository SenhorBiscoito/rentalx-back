import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IFindCarBy } from "@modules/cars/dtos/IFindCarBy";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAllAvailable({
    brand,
    category_id,
    name,
  }: IFindCarBy): Promise<Car[]> {
    const existFilter = !!name || brand || category_id;

    const cars = this.cars
      .filter((car) => (car.availability === true ? car : null))
      .filter((car) => {
        if (!!brand && car.brand === brand) {
          return car;
        }
        if (!!name && car.name === name) {
          return car;
        }
        if (!!category_id && car.category_id === category_id) {
          return car;
        }

        if (existFilter) return null;

        return car;
      });

    return cars;
  }
}

export { CarsRepositoryInMemory };
