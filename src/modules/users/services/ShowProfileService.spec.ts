import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;
describe('ShowProfile', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to list an existing user', async () => {
    const user = await fakeUsersRepository.create({
      email: 'john@doe.com',
      name: 'John Doe',
      password: '123'
    });

    const shownUser = await showProfileService.execute(user.id);

    expect(shownUser.name).toBe('John Doe');
    expect(shownUser.email).toBe('john@doe.com');

  });

  it('should not be able to list an profile of a user that does not exist', async () => {

    await expect(
      showProfileService.execute('non-existing-user')
    ).rejects.toBeInstanceOf(AppError);

  });

});
