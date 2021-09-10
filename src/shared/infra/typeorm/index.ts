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
    console.log("Banco de dados conectado");
  })
  .catch((err) => {
    console.log("Não foi possível conectar à base de dados:", err);
  });
