import { createConnection, getConnectionOptions } from "typeorm";

interface IOptions {
  host: string;
}

const connection = getConnectionOptions().then((options) => {
  const newOptions = options as IOptions;
  newOptions.host = "database_ignite";
  createConnection({
    ...options,
  });
});

connection
  .then(() => {
    console.log("Banco de dados conectado");
  })
  .catch((err) => {
    console.log("Não foi possível conectar à base de dados:", err);
  });
