import User from '@modules/users/infra/typeorm/entities/User';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface RequestDTO {
  user_id: string;
  avatar_url: string;
}

class updateUserAvatarService {

  constructor(private usersRepository: IUsersRepository){}

  public async execute({ user_id, avatar_url }: RequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("Woops! An error ocurred when trying to change your avatar, try to login again!", 400);
    }
    if (user.avatar_url) {
      const useraAvatarFilePath = path.join(uploadConfig.path, user.avatar_url);
      const fileExists = await fs.promises.stat(useraAvatarFilePath);

      if (fileExists) {
        await fs.promises.unlink(useraAvatarFilePath);
      }
    }

    user.avatar_url = avatar_url;

    await this.usersRepository.save(user);

    delete user.password;

    return user;
  }
}

export default updateUserAvatarService;
