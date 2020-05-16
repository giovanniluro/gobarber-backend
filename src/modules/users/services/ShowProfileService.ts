import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

export default class ShowProfileService {

  constructor(private usersRepository: IUsersRepository){}

  public async execute(user_id: string): Promise<User> {

    const user = await this.usersRepository.findById(user_id);

    if(!user) throw new AppError('User not found!');

    return user;
  }

}
