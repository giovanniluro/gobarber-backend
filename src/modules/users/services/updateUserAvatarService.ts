import User from '@modules/users/infra/typeorm/entities/User';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface RequestDTO {
  user_id: string;
  avatar_url: string;
}

class updateUserAvatarService {

  constructor(private usersRepository: IUsersRepository, private storageProvider: IStorageProvider){}

  public async execute({ user_id, avatar_url }: RequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("Woops! An error ocurred when trying to change your avatar, try to login again!", 400);
    }
    if (user.avatar_url) {
      await this.storageProvider.delete(user.avatar_url);
    }

    const filename = await this.storageProvider.save(avatar_url);

    user.avatar_url = filename;

    await this.usersRepository.save(user);

    delete user.password;

    return user;
  }
}

export default updateUserAvatarService;
