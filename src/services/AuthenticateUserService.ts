import User from '../models/User';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { secret } from '../config/jwt';

interface authDTO {
  email: string;
  password: string;
}

interface response{
  user: User;
  token: string
}

class AuthenticateUserService {
  public async execute({email, password}: authDTO): Promise<response> {
    const usersRepository = getRepository(User);

    const foundUser = await usersRepository.findOne({where: {email}});

    if(!foundUser) throw new Error("Email not found!");

    const passwordMatched = await compare(password, foundUser.password);

    if(!passwordMatched) throw new Error("Password do not match.");


    const token = sign({foundUser}, secret, {
      subject: foundUser.id,
      expiresIn: '1d',

    });

    return {user: foundUser, token};
  }
}

export default AuthenticateUserService;
