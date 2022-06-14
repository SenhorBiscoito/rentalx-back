import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id } = request.params;
    const images = request.files as Express.Multer.File[];

    const uploadImageUseCase = container.resolve(UploadCarImagesUseCase);

    const images_name = images.map((file) => file.filename);

    await uploadImageUseCase.execute({
      car_id,
      images_name,
    });

    return response.status(201).json({ message: "Uploaded" });
  }
}

export { UploadCarImagesController };
