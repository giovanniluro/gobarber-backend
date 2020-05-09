import User from '../models/User';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { secret } from '../config/jwt';
import AppError from '../errors/AppError';

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

    if(!foundUser) throw new AppError("Email not found!", 401);

    const passwordMatched = await compare(password, foundUser.password);

    if(!passwordMatched) throw new AppError("Password do not match.", 401);


    const token = sign({foundUser}, secret, {
      subject: foundUser.id,
      expiresIn: '1d',

    });

    return {user: foundUser, token};
  }
}

export default AuthenticateUserService;
