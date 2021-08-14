import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/implementations/ICategoriesRepository";

export class ListAllCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}
  execute(): Category[] {
    const categories = this.categoriesRepository.list();
    return categories;
  }
}
