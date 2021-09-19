import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListAllSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationsRepository
  ) {}
  async execute(): Promise<Specification[]> {
    const specifications = await this.specificationRepository.list();
    return specifications;
  }
}
