import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IFindCarBy } from "../dtos/IFindCarBy";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  findById(car_id: string): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  create(data: ICreateCarDTO): Promise<Car>;
  findAllAvailable({ brand, category_id, name }: IFindCarBy): Promise<Car[]>;
}

export { ICarsRepository };
