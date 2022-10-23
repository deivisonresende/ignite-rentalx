import dotenv from "dotenv";

dotenv.config();

interface IEnvProvider {
  get(name: string): string;
}

export { IEnvProvider };
