import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
let token: string;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admrentalx", 8);
    await connection.query(` 
      INSERT INTO users
      (id, name, email, password, "isAdmin", created_at, driver_license, avatar) 
      VALUES ('${id}','admin','admin@rentalx.com.br','${password}','true','now()', 'xxxxx', 'avatar')
    `);

    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentalx.com.br",
      password: "admrentalx",
    });

    token = responseToken?.body?.token;
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new category", async () => {
    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
     

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a new category with name exists", async () => {
    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});
