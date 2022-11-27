import { container } from "tsyringe";

import { IEnvProvider } from "./IEnvProvider";
import { EnvProvider } from "./implementations/EnvProvider";

container.registerSingleton<IEnvProvider>("EnvProvider", EnvProvider);
