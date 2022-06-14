import { inject, injectable } from "tsyringe";

import { IFindCarBy } from "@modules/cars/dtos/IFindCarBy";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carRepository: ICarsRepository
  ) {}

  async execute({ brand, category_id, name }: IFindCarBy): Promise<Car[]> {
    const cars = await this.carRepository.findAllAvailable({
      brand,
      category_id,
      name,
    });

    return cars;
  }
}

export { ListAvailableCarsUseCase };
