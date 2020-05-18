import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';

export default class UsersRepository implements IUsersRepository {

  private users: User[] = [];

  public async create({ email, name, password }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {id: uuid(), email, name, password});

    this.users.push(user);

    return user;
  }

  public async save(user: User) {
    const findIndex = this.users.findIndex(u => u.id === user.id);
    this.users[findIndex] = user;

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.email === email);

    return foundUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.id === id);

    return foundUser;
  }

  public async findAllProviders(exceptUserId?: string): Promise<User[]> {
    let users = this.users;

    if(exceptUserId) users = users.filter( user => user.id != exceptUserId);

    return users;
  }

}
