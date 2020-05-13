import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import User from '../entities/User';
import { Repository, getRepository } from 'typeorm';

export default class UserTokensRepository implements IUserTokensRepository {

  private ormRepository: Repository<UserToken>;

  constructor(){
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {

    const userToken = this.ormRepository.findOne({where: {
      token
    }});

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {

    const newToken = this.ormRepository.create({
      user_id
    });

    await this.ormRepository.save(newToken);

    return newToken;
  }

}
