import { Request, Response } from 'express';
import UsersRepository from '@modules/users/infra/typeorm/repositores/UsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/updateUserAvatarService';

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

  public async updateAvatar(request:Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const updateUserAvatarService = new UpdateUserAvatarService(usersRepository);

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatar_url: request.file.filename
    })

    return response.json(user)
  }
}
