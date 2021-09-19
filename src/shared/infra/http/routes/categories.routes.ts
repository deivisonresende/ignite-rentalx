import { CreateCategoryController } from "@modules/cars/useCases/createCategory/createCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListAllCategoriesController } from "@modules/cars/useCases/listCategories/listAllCategoriesController";
import { Router } from "express";
import multer from "multer";

const categoriesRoutes = Router();
const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listAllCategoriesController = new ListAllCategoriesController();

categoriesRoutes.post("/", createCategoryController.handle);
categoriesRoutes.get("/", listAllCategoriesController.handle);
categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
