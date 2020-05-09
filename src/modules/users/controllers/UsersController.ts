import { Request, Response } from 'express';
import UsersRepository from '@modules/users/infra/typeorm/repositores/UsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersControllers {

  public async auth( request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const usersRepository = new UsersRepository();
    const authUser = new AuthenticateUserService(usersRepository);

    const auth = await authUser.execute({ email, password });

    return response.json(auth);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const createUserService = new CreateUserService(usersRepository);
    const { name, email, password } = request.body;

    const user = await createUserService.execute({ name, password, email });

    return response.json(user);
  }
}
