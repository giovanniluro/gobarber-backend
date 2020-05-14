import CreateUserService from '@modules/users/services/CreateUserService';
import UsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/provider/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let usersRepository: UsersRepository;
let hashProvider: FakeHashProvider;
let createUserService: CreateUserService;


describe('CreateUser', () => {

  beforeEach(() => {
    usersRepository = new UsersRepository();
    hashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(usersRepository, hashProvider);
  })

  it('should be able to create a new user', async () => {

    const user = await createUserService.execute({ name: 'John Doe', email: 'johndoe@wow.com', password: '123' });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same email', async () => {
    const usersRepository = new UsersRepository();
    const hashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(usersRepository, hashProvider);

    const user = await createUserService.execute({ name: 'John Doe', email: 'johndoe@wow.com', password: '123' });

    await expect(createUserService.execute(
      { name: 'John Doe', email: 'johndoe@wow.com', password: '123' }
    )).rejects.toBeInstanceOf(AppError);

  });

});
