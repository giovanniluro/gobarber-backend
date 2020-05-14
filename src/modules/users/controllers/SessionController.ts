import { Request, Response } from 'express';
import UsersRepository from '@modules/users/infra/typeorm/repositores/UsersRepository';
import BCryptHashProvider from '@modules/users/provider/HashProvider/implementations/BCryptHashProvider';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class UsersControllers {

  public async create( request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const usersRepository = new UsersRepository();
    const hashProvider = new BCryptHashProvider();
    const authUser = new AuthenticateUserService(usersRepository, hashProvider);

    const auth = await authUser.execute({ email, password });

    return response.json(auth);
  }

}
