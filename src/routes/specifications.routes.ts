import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListAllSpecificationsController } from "../modules/cars/useCases/listSpecifications/ListAllSpecificationsController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listAllSpecificationController = new ListAllSpecificationsController();

specificationsRoutes.post("/", createSpecificationController.handle);

specificationsRoutes.get("/", listAllSpecificationController.handle);
export { specificationsRoutes };
