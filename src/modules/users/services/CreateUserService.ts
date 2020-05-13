import User from '@modules/users/infra/typeorm/entities/User';
import { hash } from 'bcryptjs'
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/provider/HashProvider/models/IHashProvider';

interface userDTO {
  name: string;
  password: string;
  email: string;
}

class CreateUserService {

  constructor(private usersRepository: IUsersRepository, private hashProvider: IHashProvider) { }


  public async execute({ name, email, password }: userDTO): Promise<User> {

    const checkIfUserExists = await this.usersRepository.findByEmail(email);

    if (checkIfUserExists) throw new AppError("An user with this email already exists!", 401);

    const hashedPassword = await this.hashProvider.generateHash(password);

    const newUser = await this.usersRepository.create({ name, email, password: hashedPassword });

    return newUser;
  }
}
export default CreateUserService;
