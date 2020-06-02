import ListProvidersService from '../services/ListProvidersService';
import UsersRepository from '@modules/users/infra/typeorm/repositores/UsersRepository';
import {Request, Response} from 'express';
import RedisCacheProvider from '@shared/container/providers/CacheProvider/implementations/RedisCacheProvider';

export default class ProviderController {

  public async index(request: Request, response: Response): Promise<Response>{
    const userId = request.user.id;
    const usersRepository = new UsersRepository();
    const cacheProvider = new RedisCacheProvider();
    const listProvidersService = new ListProvidersService(usersRepository, cacheProvider);

    const providers = await listProvidersService.execute(userId);

    return response.json(providers);
  }

}
