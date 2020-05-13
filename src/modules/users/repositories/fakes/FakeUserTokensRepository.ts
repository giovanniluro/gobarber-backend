import IUserTokensRepository from "../IUserTokensRepository";
import UserToken from "@modules/users/infra/typeorm/entities/UserToken";
import { uuid } from "uuidv4";
import  AppError from '@shared/errors/AppError';

export default class FakeUsersRepository implements IUserTokensRepository{

  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken>{
    const token = new UserToken();

    Object.assign(token, {
      user_id,
      id: uuid(),
      token: uuid(),
      created_at: Date.now(),
      updated_at: Date.now()
    })

    this.userTokens.push(token);

    return token;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const foundToken = this.userTokens.find(t => t.token === token);

    return foundToken;
  }

}
