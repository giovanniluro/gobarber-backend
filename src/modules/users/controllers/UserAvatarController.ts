import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import UsersRepository from '@modules/users/infra/typeorm/repositores/UsersRepository';
import UpdateUserAvatarService from '@modules/users/services/updateUserAvatarService';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';

export default class UpdateAvatarController {

  public async update(request:Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const storageProvider = new DiskStorageProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(usersRepository, storageProvider);

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatar_url: request.file.filename
    })

    return response.json(classToClass(user));
  }
}
