import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ListAllCategoriesController } from "./listAllCategoriesController";
import { ListAllCategoriesUseCase } from "./listAllCategoriesUseCase";

const categoriesRepository = CategoriesRepository.getInstance();

const listAllCategoriesUseCase = new ListAllCategoriesUseCase(
  categoriesRepository
);
const listAllCategoriesController = new ListAllCategoriesController(
  listAllCategoriesUseCase
);

export { listAllCategoriesController };
