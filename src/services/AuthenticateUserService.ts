import User from '../models/User';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

interface authDTO {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({email, password}: authDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const foundUser = await usersRepository.findOne({where: {email}});

    if(!foundUser) throw new Error("Email not found!");

    const passwordMatched = await compare(password, foundUser.password);

    if(!passwordMatched) throw new Error("Password do not match.");

    return foundUser;
  }
}

export default AuthenticateUserService;
