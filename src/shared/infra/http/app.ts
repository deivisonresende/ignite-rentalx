import upload from "@config/upload";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import "@shared/container";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import { AppError } from "@shared/errors/AppErrors";
import { router } from "@shared/infra/http/routes";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../../swagger.json";

createConnection("localhost");
const app = express();

app.use(express.json());
app.use(router);
app.use(morgan("dev"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    console.log(err);
    if (err instanceof AppError)
      return response.status(err.statusCode).json({ message: err.message });

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
