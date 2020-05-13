import { Request, Response } from 'express';
import UsersRepository from '@modules/users/infra/typeorm/repositores/UsersRepository';
import BCryptHashProvider from '@modules/users/provider/HashProvider/implementations/BCryptHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import { hash } from 'bcryptjs';

export default class UsersControllers {

  public async create(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const hashProvider = new BCryptHashProvider();
    const createUserService = new CreateUserService(usersRepository, hashProvider);
    const { name, email, password } = request.body;

    const user = await createUserService.execute({ name, password, email });

    return response.json(user);
  }
}
