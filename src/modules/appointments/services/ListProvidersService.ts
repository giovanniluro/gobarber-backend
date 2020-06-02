import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

export default class ListProvidersService {

  constructor(private usersRepository: IUsersRepository, private cacheProvider: ICacheProvider) { }

  public async execute(userId: string): Promise<User[]> {

    let users = await this.cacheProvider.recover<User[]>(`providers-list:${userId}`);

    if (!users) {
      users = await this.usersRepository.findAllProviders(userId);

      console.log('A query no banco foi feita!');

      await this.cacheProvider.save(`providers-list:${userId}`, users);
    }

    return users;
  }

}
