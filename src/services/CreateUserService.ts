import User from '../models/User';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs'
import AppError from '../errors/AppError';

interface userDTO {
  name: string;
  password: string;
  email: string;
}

class CreateUserService {

  public async execute({ name, email, password }: userDTO): Promise<User> {
    try {
      const usersRepository = getRepository(User);

      const checkIfUserExists = await usersRepository.findOne({
        where: { email }
      });

      if (checkIfUserExists) throw new AppError("An user with this email already exists!", 401);

      const hashedPassword = await hash(password, 8);

      const newUser = usersRepository.create({ name, email, password: hashedPassword });
      await usersRepository.save(newUser);

      delete newUser.password;

      return newUser;
    } catch(err) {
      throw err.message;
    }
  }

}
export default CreateUserService;
