import User from '@modules/users/infra/typeorm/entities/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { secret } from '@config/jwt';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface authDTO {
  email: string;
  password: string;
}

interface response{
  user: User;
  token: string
}

class AuthenticateUserService {

  constructor(private usersRepository: IUsersRepository){}

  public async execute({email, password}: authDTO): Promise<response> {

    const foundUser = await this.usersRepository.findByEmail(email);

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
