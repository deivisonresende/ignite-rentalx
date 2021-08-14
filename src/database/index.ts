import { createConnection, getConnectionOptions } from "typeorm";

interface IOptions {
  host: string;
}

try {
  getConnectionOptions().then((options) => {
    const newOptions = options as IOptions;
    newOptions.host = "database";
    createConnection({
      ...options,
    });
    console.log("Conectado ao bando de dados");
  });
} catch (error) {
  console.log(error);
}
