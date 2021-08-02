import { SpecificationsRepository } from "../../repositories/SpecificationsRepository";
import { ListAllSpecificationsController } from "./ListAllSpecificationsController";
import { ListAllSpecificationsUseCase } from "./ListAllSpecificationsUseCase";

const specificationsRepository = SpecificationsRepository.getInstance();
const listAllSpecificationsUseCase = new ListAllSpecificationsUseCase(
  specificationsRepository
);
const listAllSpecificationController = new ListAllSpecificationsController(
  listAllSpecificationsUseCase
);
export { listAllSpecificationController };
