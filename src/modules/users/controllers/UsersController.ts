import { Request, Response } from 'express';
import UsersRepository from '@modules/users/infra/typeorm/repositores/UsersRepository';
import BCryptHashProvider from '@modules/users/provider/HashProvider/implementations/BCryptHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import { hash } from 'bcryptjs';
import { classToClass } from 'class-transformer';
import RedisCacheProvider from '@shared/container/providers/CacheProvider/implementations/RedisCacheProvider';

export default class UsersControllers {

  public async create(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const hashProvider = new BCryptHashProvider();
    const cacheProvider = new RedisCacheProvider();
    const createUserService = new CreateUserService(usersRepository, hashProvider, cacheProvider);
    const { name, email, password } = request.body;

    const user = await createUserService.execute({ name, password, email });

    return response.json(classToClass(user));
  }
}
