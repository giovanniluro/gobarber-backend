import { Request, Response } from 'express';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import UsersRepository from '@modules/users/infra/typeorm/repositores/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositores/UserTokensRepository';
import HashProvider from '@modules/users/provider/HashProvider/implementations/BCryptHashProvider';

export default class ResetPasswordController {

  public async create(request: Request, response: Response) {
    const hashProvider = new HashProvider();
    const usersRepository = new UsersRepository();
    const userTokensRepository = new UserTokensRepository();
    const resetPasswordService = new ResetPasswordService(usersRepository, userTokensRepository, hashProvider);

    const { password, token } = request.body;

    await resetPasswordService.execute({
      password,
      token
    })

    return response.status(200).json({ message: "Senha alterada com sucesso!" });
  }

}
