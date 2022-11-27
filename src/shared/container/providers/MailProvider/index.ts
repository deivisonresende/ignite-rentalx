import { container } from "tsyringe";

import { EnvProvider } from "../EnvProvider/implementations/EnvProvider";
import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";

const envProvider = container.resolve(EnvProvider);

const provider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  "MailProvider",
  provider[envProvider.get("mail_provider")]
);
