import User from '../models/User';
import { getRepository } from 'typeorm';
import path from 'path';
import uploadConfig from '../config/upload';
import fs from 'fs';

interface RequestDTO {
  user_id: string;
  avatar_url: string;
}

class updateUserAvatarService {
  public async execute({user_id, avatar_url}: RequestDTO): Promise<User>{
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if(!user) {
      throw new Error("Woops! An error ocurred when trying to change your avatar, try to login again!");
    }

    if(user.avatar_url) {
      const useraAvatarFilePath = path.join(uploadConfig.path, user.avatar_url);
      const fileExists = await fs.promises.stat(useraAvatarFilePath);

      if(fileExists) {
        await fs.promises.unlink(useraAvatarFilePath);
      }
    }

    user.avatar_url = avatar_url;

    await usersRepository.save(user);

    delete user.password;

    return user;
  }
}

export default updateUserAvatarService;
