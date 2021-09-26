import { CreateCarController } from "@modules/cars/useCases/createCar/createCarController";
import { ListAllCarsController } from "@modules/cars/useCases/listCars/listAllCarsController";
import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createCarController = new CreateCarController();
const listAllCarsController = new ListAllCarsController();
const carsRoutes = Router();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);
carsRoutes.get("/", listAllCarsController.handle);

export { carsRoutes };
