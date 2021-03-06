import User from '@modules/users/infra/typeorm/entities/User';
import { sign } from 'jsonwebtoken';
import { secret } from '@config/jwt';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/provider/HashProvider/models/IHashProvider';

interface authDTO {
  email: string;
  password: string;
}

interface response{
  user: User;
  token: string
}

class AuthenticateUserService {

  constructor(private usersRepository: IUsersRepository, private hashProvider: IHashProvider){}

  public async execute({email, password}: authDTO): Promise<response> {

    const foundUser = await this.usersRepository.findByEmail(email);

    if(!foundUser) throw new AppError("Email not found!", 401);

    const passwordMatched = await this.hashProvider.compareHash(password, foundUser.password);

    if(!passwordMatched) throw new AppError("Password do not match.", 401);


    const token = sign({foundUser}, secret, {
      subject: foundUser.id,
      expiresIn: '1d',

    });

    delete foundUser.password;

    return {user: foundUser, token};
  }
}

export default AuthenticateUserService;
