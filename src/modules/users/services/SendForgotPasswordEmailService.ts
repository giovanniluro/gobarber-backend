import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import AppError from '@shared/errors/AppError';

export default class SendForgotPasswordEmailService {

  constructor(
    private usersRepository: IUsersRepository,
    private IMailProvider: IMailProvider,
    private userTokensRepository: IUserTokensRepository
  ) { }

  public async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('No users found with this email!', 401);

    this.IMailProvider.sendMail(email, 'Pedido de recuperação de senha');
    this.userTokensRepository.generate(user.id);
  }

}
