import { container } from "tsyringe";

import { EnvProvider } from "../EnvProvider/implementations/EnvProvider";
import { LocalStorageProvider } from "./implementations/LocalStorageProvider";
import { S3StorageProvider } from "./implementations/S3StorageProvider";
import { IStorageProvider } from "./IStorageProvider";

const envProvider = container.resolve(EnvProvider);

const storage = {
  disk: LocalStorageProvider,
  cloud: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  storage[envProvider.get("storage_provider")]
);
