import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create users", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it("should be able to create a new user", async () => {
    const user: ICreateUserDTO = {
      name: "User test",
      driver_license: "0123456789",
      email: "user.test@teste.com",
      password: "124",
    };
    await createUserUseCase.execute(user);
    const userCreated = await usersRepositoryInMemory.findByEmail(user.email);
    expect(userCreated.email).toEqual(userCreated.email);
  });
});
