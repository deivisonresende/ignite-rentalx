import { createConnection, getConnectionOptions } from "typeorm";

interface IOptions {
  host: string;
}

getConnectionOptions()
  .then((options) => {
    const newOptions = options as IOptions;
    newOptions.host = "localhost";
    createConnection({
      ...options,
    });
  })
  .catch((err) => {
    console.log("Não foi possível conectar à base de dados:", err);
  });
