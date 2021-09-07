import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListAllSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListAllSpecificationsController";
import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listAllSpecificationController = new ListAllSpecificationsController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", createSpecificationController.handle);

specificationsRoutes.get("/", listAllSpecificationController.handle);
export { specificationsRoutes };
