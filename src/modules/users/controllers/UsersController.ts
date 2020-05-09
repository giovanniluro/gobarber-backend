import { Request, Response } from 'express';
import UsersRepository from '@modules/users/infra/typeorm/repositores/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersControllers {

  public async create(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const createUserService = new CreateUserService(usersRepository);
    const { name, email, password } = request.body;

    const user = await createUserService.execute({ name, password, email });

    return response.json(user);
  }
}
