import IHashProvider from '@modules/users/provider/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: {
    old?: string;
    new: string;
  }
}

export default class UpdateProfileService {

  constructor(
    private hashProvider: IHashProvider,
    private usersRepository: IUsersRepository
  ) { }

  public async execute({ user_id, email, name, password }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if(!user) throw new AppError('User not found!');

    const existingEmail = await this.usersRepository.findByEmail(email);

    if(existingEmail && existingEmail.id != user.id) throw new AppError('The email you are trying to use is already being used!');


    if(password) {
      if(!password.old) throw new AppError('You should inform your old password');

      const checkPassword = await this.hashProvider.compareHash(password.old, user.password);
      if(password.old && !checkPassword) throw new AppError('The old password is wrong');

      user.password = await this.hashProvider.generateHash(password.new);
    }
    user.name = name;
    user.email = email;

    return this.usersRepository.save(user);
  }

}
