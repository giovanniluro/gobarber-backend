import SendForgotPasswordEmail from '@modules/users/services/SendForgotPasswordEmailService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmail;


describe('ForgotPassword', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    sendForgotPasswordEmail = new SendForgotPasswordEmail(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository);
  });


  it('should be able to recover the password using the email', async () => {
    const mailSent = spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '1234'
    })

    await sendForgotPasswordEmail.execute('john@doe.com');

    expect(mailSent).toHaveBeenCalled();
  });

  it('should not be able to recover a password from a non-existing email', async () => {
    await expect(sendForgotPasswordEmail.execute('john@doe.com')).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to generate a forgot password token', async () => {
    const tokenSent = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '1234'
    })

    await sendForgotPasswordEmail.execute('john@doe.com');

    expect(tokenSent).toHaveBeenCalledWith(user.id);
  });

});
