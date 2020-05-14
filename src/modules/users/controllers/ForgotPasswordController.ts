import { Request, Response } from 'express';
import UsersRepository from '@modules/users/infra/typeorm/repositores/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositores/UserTokensRepository';
import MailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';
import SendEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import TemplateProvider from '@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailProvider';

export default class ForgotPasswordController {

  public async create(request: Request, response: Response) {

    const usersRepository = new UsersRepository();
    const userTokensRepository = new UserTokensRepository();
    const mailProvider = await new MailProvider(new TemplateProvider());

    const { email } = request.body;

    const sendEmailService = new SendEmailService(usersRepository, mailProvider, userTokensRepository);

    await sendEmailService.execute(email);

    return response.status(204).json();
  }

}
