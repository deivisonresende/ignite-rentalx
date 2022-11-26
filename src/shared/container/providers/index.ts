import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IEnvProvider } from "./EnvProvider/IEnvProvider";
import { EnvProvider } from "./EnvProvider/implementations/EnvProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

const envProvider = new EnvProvider();

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);

container.registerSingleton<IEnvProvider>("EnvProvider", EnvProvider);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

const storage = {
  disk: LocalStorageProvider,
  cloud: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  storage[envProvider.get("storage")]
);
