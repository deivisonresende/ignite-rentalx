import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListAllUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}
  async execute(): Promise<User[]> {
    return this.usersRepository.lisAllUsers();
  }
}
