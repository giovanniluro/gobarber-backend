import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import AppError from '@shared/errors/AppError';
import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';

export default class SendForgotPasswordEmailService {

  constructor(
    private usersRepository: IUsersRepository,
    private IMailProvider: IMailProvider = new EtherealMailProvider(),
    private userTokensRepository: IUserTokensRepository
  ) { }

  public async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('No users found with this email!', 401);

    const { token } = await this.userTokensRepository.generate(user.id);

    await this.IMailProvider.sendMail(email, `Pedido de recuperação de senha: ${token}`);
  }

}
