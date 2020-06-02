import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '@modules/users/provider/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let usersRepository: UsersRepository;
let hashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;

describe('CreateUser', () => {

  beforeEach(() => {
    usersRepository = new UsersRepository();
    hashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUserService = new CreateUserService(usersRepository, hashProvider, fakeCacheProvider);
    authenticateUserService = new AuthenticateUserService(usersRepository, hashProvider);
  });

  it('should be able to authenticate', async () => {
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
    await expect(authenticateUserService.execute({
      email: 'johndoe@wow.com',
      password: '12345'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
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
