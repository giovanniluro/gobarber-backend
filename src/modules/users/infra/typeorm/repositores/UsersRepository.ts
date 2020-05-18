import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../entities/User';
import { getRepository, Repository, Not } from 'typeorm';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';

export default class UsersRepository implements IUsersRepository {

  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({ email, name, password }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ email, name, password });
    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User) {
    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { id } });

    return user;
  }

  public async findAllProviders(exceptUserId?: string): Promise<User[]> {
    let users: User[] = [];

    if (exceptUserId) {
      users = await this.ormRepository.find({
        where: {
          id: Not(exceptUserId)
        }
      })
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

}
