import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from "@modules/cars/repositories/ISpecificationsRepository";
import { Repository, getRepository } from "typeorm";

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;
  constructor() {
    this.repository = getRepository(Specification);
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }
  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specifications = new Specification();
    Object.assign(specifications, {
      name,
      description,
      created_at: new Date(),
    });

    const specification = this.repository.create(specifications);
    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }
  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();
    return specifications;
  }
}
