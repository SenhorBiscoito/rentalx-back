import { Parser } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  private loadCategories(
    file: Express.Multer.File
  ): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = new Parser({});
      stream.pipe(parseFile); // pipe the data to the parser

      // when the parser emits a line
      parseFile
        .on("data", async (line) => {
          console.log(line);
          const [name, description] = line;
          const category = { name, description };

          categories.push(category);
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name } = category;
      const existCategory = await this.categoriesRepository.findByName(name);

      if (!existCategory) {
        await this.categoriesRepository.create(category);
      }
    });
  }
}

export { ImportCategoryUseCase };
