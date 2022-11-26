import upload from "@config/upload";
import { S3 } from "aws-sdk";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";

import { IEnvProvider } from "../../EnvProvider/IEnvProvider";
import { IStorageProvider } from "../IStorageProvider";

@injectable()
class S3StorageProvider implements IStorageProvider {
  private client: S3;
  private bucketName: string;
  constructor(
    @inject("EnvProvider")
    private envProvider: IEnvProvider
  ) {
    this.bucketName = this.envProvider.get("aws_bucket");
    this.client = new S3({
      region: this.envProvider.get("aws_region"),
      credentials: {
        accessKeyId: this.envProvider.get("aws_access_key_id"),
        secretAccessKey: this.envProvider.get("aws_secret_key"),
      },
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);
    const content = await fs.promises.readFile(originalName);

    const ContentType = mime.getType(originalName);

    await this.client
      .putObject({
        Bucket: `${this.bucketName}/${folder}`,
        Key: file,
        Body: content,
        ACL: "public-read",
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalName);
    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${this.bucketName}/${folder}`,
        Key: file,
      })
      .promise();
  }
}

export { S3StorageProvider };
