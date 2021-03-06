import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import "@shared/container";
import swaggerUi from "swagger-ui-express";

import { AppError } from "@shared/errors/AppErrors";
import { router } from "@shared/infra/http/routes";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../../swagger.json";

createConnection("localhost");
const app = express();

app.use(express.json());
app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({ message: err.message, status: err.statusCode });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3000, () => console.log("Server is running"));
