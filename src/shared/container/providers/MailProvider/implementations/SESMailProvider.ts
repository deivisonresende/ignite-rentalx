import { SES } from "aws-sdk";
import fs from "fs";
import Handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { inject, injectable } from "tsyringe";

import { IEnvProvider } from "../../EnvProvider/IEnvProvider";
import { IMailProvider, IParameters } from "../IMailProvider";

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;
  constructor(
    @inject("EnvProvider")
    private envProvider: IEnvProvider
  ) {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: this.envProvider.get("aws_region"),
        credentials: {
          accessKeyId: this.envProvider.get("aws_access_key_id"),
          secretAccessKey: this.envProvider.get("aws_secret_key"),
        },
      }),
    });
  }

  async sendEmail({
    to,
    subject,
    variables,
    path,
  }: IParameters): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = Handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      from: "Retal-x <noreplay@rentalx.com.br>",
      to,
      subject,
      html: templateHTML,
    });
  }
}

export { SESMailProvider };
