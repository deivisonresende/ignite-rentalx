import fs from "fs";
import Handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { IMailProvider, IParameters } from "../IMailProvider";

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.client = transporter;
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

    const message = await this.client.sendMail({
      from: "Retal-x <noreplay@rentalx.com.br>",
      to,
      subject,
      html: templateHTML,
    });

    console.log("message sent: %s", message?.messageId);
    console.log("preview url: %s", nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
