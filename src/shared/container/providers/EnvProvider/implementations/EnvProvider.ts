import "dotenv/config";

import { IEnvProvider } from "../IEnvProvider";

class EnvProvider implements IEnvProvider {
  get(name: string): string {
    return process.env[name.toUpperCase()];
  }
}

export { EnvProvider };
