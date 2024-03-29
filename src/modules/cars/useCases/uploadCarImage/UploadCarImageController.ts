import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

interface IFiles {
  filename: string;
}

export class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id } = request.params;
    const images = request.files as unknown as IFiles[];
    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    const images_name = images.map((file) => file.filename);

    await uploadCarImageUseCase.execute({
      car_id,
      images_name,
    });

    return response.status(201).send();
  }
}
