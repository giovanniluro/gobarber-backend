import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '@modules/users/provider/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {

  it('should be able to authenticate', async () => {
    const usersRepository = new UsersRepository();
    const hashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(usersRepository, hashProvider);
    const authenticateUserService = new AuthenticateUserService(usersRepository, hashProvider);

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@wow.com',
      password: '12345',
    });

    const response = await authenticateUserService.execute({
      email: 'johndoe@wow.com',
      password: '12345'
    })

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate with unexisting user', async () => {
    const usersRepository = new UsersRepository();
    const hashProvider = new FakeHashProvider();
    const authenticateUserService = new AuthenticateUserService(usersRepository, hashProvider);

    await expect(authenticateUserService.execute({
      email: 'johndoe@wow.com',
      password: '12345'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new UsersRepository();
    const hashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(usersRepository, hashProvider);
    const authenticateUserService = new AuthenticateUserService(usersRepository, hashProvider);

    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@wow.com',
      password: '12345',
    });

    await expect(authenticateUserService.execute({
      email: 'johndoe@wow.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });

});
