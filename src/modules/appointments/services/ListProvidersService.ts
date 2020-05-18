import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

export default class ListProvidersService {

  constructor(private usersRepository: IUsersRepository){}

  public async execute(userId: string): Promise<User[]> {

    const users = await this.usersRepository.findAllProviders(userId);

    return users;
  }

}
