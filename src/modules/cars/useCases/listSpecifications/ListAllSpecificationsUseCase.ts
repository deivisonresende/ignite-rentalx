import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/implementations/ISpecificationsRepository";

export class ListAllSpecificationsUseCase {
  constructor(private specificationRepository: ISpecificationsRepository) {}
  execute(): Specification[] {
    const specifications = this.specificationRepository.list();
    return specifications;
  }
}
