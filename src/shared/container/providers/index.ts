import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IEnvProvider } from "./EnvProvider/IEnvProvider";
import { EnvProvider } from "./EnvProvider/implementations/EnvProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);

container.registerSingleton<IEnvProvider>("EnvProvider", EnvProvider);
