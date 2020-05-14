import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import AppError from '@shared/errors/AppError';
import HandlebarsMailProvider from '@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailProvider';
import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';
import path from 'path';

export default class SendForgotPasswordEmailService {

  constructor(
    private usersRepository: IUsersRepository,
    private iMailProvider: IMailProvider,
    private userTokensRepository: IUserTokensRepository
  ) { }

  public async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    //const handlebarsMailProvider = new HandlebarsMailProvider();
   // this.iMailProvider = new EtherealMailProvider(handlebarsMailProvider);

    if (!user) throw new AppError('No users found with this email!', 401);

    const { token } = await this.userTokensRepository.generate(user.id);

    await this.iMailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: path.resolve(__dirname, '..','views','ForgotPassword.hbs'),
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`
        }
      }
    });
  }

}
