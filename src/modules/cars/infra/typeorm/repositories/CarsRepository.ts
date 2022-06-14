import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IFindCarBy } from "@modules/cars/dtos/IFindCarBy";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = await this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });

    return car;
  }

  async findAllAvailable({
    brand,
    category_id,
    name,
  }: IFindCarBy): Promise<Car[]> {
    const carQuery = await this.repository
      .createQueryBuilder("car")
      .where("car.availability = :availability", { availability: true });

    if (brand) {
      carQuery.andWhere("car.brand = :brand", { brand });
    }

    if (category_id) {
      carQuery.andWhere("car.category_id = :category_id", { category_id });
    }

    if (name) {
      carQuery.andWhere("car.name = :name", { name });
    }

    const cars = await carQuery.getMany();

    return cars;
  }
}

export { CarsRepository };
