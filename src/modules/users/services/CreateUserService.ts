import User from '@modules/users/infra/typeorm/entities/User';
import { hash } from 'bcryptjs'
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface userDTO {
  name: string;
  password: string;
  email: string;
}

class CreateUserService {

  constructor(private usersRepository: IUsersRepository) { }


  public async execute({ name, email, password }: userDTO): Promise<User> {

      const checkIfUserExists = await this.usersRepository.findByEmail(email);

      if (checkIfUserExists) throw new AppError("An user with this email already exists!", 401);

      const hashedPassword = await hash(password, 8);

      const newUser = await this.usersRepository.create({ name, email, password: hashedPassword });

      delete newUser.password;

      return newUser;
  }
}
export default CreateUserService;
