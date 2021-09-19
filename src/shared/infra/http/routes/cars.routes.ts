import { CreateCarController } from "@modules/cars/useCases/createCar/createCarController";
import { ListAllCarsController } from "@modules/cars/useCases/listCars/listAllCarsController";
import { Router } from "express";

const createCarController = new CreateCarController();
const listAllCarsController = new ListAllCarsController();
const carsRoutes = Router();

carsRoutes.post("/", createCarController.handle);
carsRoutes.get("/", listAllCarsController.handle);

export { carsRoutes };
