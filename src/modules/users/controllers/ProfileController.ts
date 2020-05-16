import { Request, Response } from 'express';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import UsersRepository from '@modules/users/infra/typeorm/repositores/UsersRepository';
import HashProvider from '@modules/users/provider/HashProvider/implementations/BCryptHashProvider';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {

  public async show(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const showProfileService = new ShowProfileService(usersRepository);
    const userId = request.user.id;

    const user = await showProfileService.execute(userId);

    return response.json({user});
  }

  public async update(request: Request,response: Response): Promise<Response> {
    const userId = request.user.id;
    const { name, email, password } = request.body;
    const usersRepository = new UsersRepository();
    const hashProvider = new HashProvider();
    const updateProfileService = new UpdateProfileService(hashProvider, usersRepository);

    const user = await updateProfileService.execute({
      user_id: userId,
      email,
      name,
      password
    })

    delete user.password;

    return response.json({user});
  }

}
