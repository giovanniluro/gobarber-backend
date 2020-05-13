import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../provider/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPassword = new ResetPasswordService(fakeUsersRepository, fakeUserTokensRepository, fakeHashProvider);

  })

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123'
    });
    const userToken = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    await resetPassword.execute({ password: '1234', token: userToken.token })

    const updatedUser = await fakeUsersRepository.findById(user.id);

    if (!updatedUser) throw Error("no user returned");

    expect(updatedUser.password).toBe('1234');
    expect(generateHash).toHaveBeenCalledWith('1234');
  });

  it('should not be able to reset the password with non-existing token', async () => {

    await expect(resetPassword.execute({
      password: '123',
      token: 'non-existing-token'
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to reset the password with non-existing user', async () => {
    const userToken = await fakeUserTokensRepository.generate('non-existing-user');

    await expect(resetPassword.execute({
      password: '123',
      token: userToken.token
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to reset the password if passed more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      email: 'john@doe.com',
      name: 'John Doe',
      password: '123'
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(resetPassword.execute({
      password: '1234',
      token
    })).rejects.toBeInstanceOf(AppError);
  });
})
