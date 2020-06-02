import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProvidersService = new ListProvidersService(fakeUsersRepository, fakeCacheProvider);
  });

  it('should be able to list all providers', async () => {

    const user1 = await fakeUsersRepository.create({
      email: '1@wow.com',
      name: 'Um',
      password: '123'
    });

    const user2 = await fakeUsersRepository.create({
      email: '2@wow.com',
      name: 'Dois',
      password: '123'
    });

    const user = await fakeUsersRepository.create({
      email: 'logado@wow.com',
      name: 'Logan',
      password: '123'
    });

    const providers = await listProvidersService.execute(user.id);

    expect(providers).toEqual([user1, user2]);

  });

});
