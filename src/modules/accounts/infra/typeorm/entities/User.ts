import { Expose } from "class-transformer";
import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { EnvProvider } from "@shared/container/providers/EnvProvider/implementations/EnvProvider";

const envProvider = new EnvProvider();

@Entity("users")
export class User {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  driver_license: string;

  @Column()
  isAdmin?: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @Expose({ name: "avatar_url" })
  avatar_url(): string {
    switch (envProvider.get("storage_provider")) {
      case "disk":
        return `${envProvider.get("api_url")}/avatar/${this.avatar}`;
      case "cloud":
        return `${envProvider.get("aws_bucket_url")}/avatar/${this.avatar}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
