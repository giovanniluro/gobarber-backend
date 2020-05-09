import { Request, Response } from 'express';
import UsersRepository from '@modules/users/infra/typeorm/repositores/UsersRepository';
import UpdateUserAvatarService from '@modules/users/services/updateUserAvatarService';

export default class UpdateAvatarController {

  public async update(request:Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const updateUserAvatarService = new UpdateUserAvatarService(usersRepository);

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatar_url: request.file.filename
    })

    return response.json(user)
  }
}
