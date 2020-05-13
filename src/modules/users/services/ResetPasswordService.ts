import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokensRepository from "../repositories/IUserTokensRepository";
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/provider/HashProvider/models/IHashProvider';
import { isAfter, addHours } from 'date-fns';

interface Request {
  token: string;
  password: string;
}

export default class ResetPasswordService {

  constructor(
    private usersRepository: IUsersRepository,
    private userTokensRepository: IUserTokensRepository,
    private hashProvider: IHashProvider
  ){}

  public async execute({password, token}: Request): Promise<void>{
    const userToken = await this.userTokensRepository.findByToken(token);

    if(!userToken) throw new AppError('User token does not exist');

    const user = await this.usersRepository.findById(userToken.user_id);

    if(!user) throw new AppError('User does not exist');

    if(isAfter(Date.now(), addHours(userToken.created_at, 2))){
      throw new AppError('Token expired! Please generate another one.');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }

  //Hash

  //2h de Duração

}
