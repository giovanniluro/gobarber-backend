import FakeHashProvider from '@modules/users/provider/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';
import AppError from '@shared/errors/AppError';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfileService: UpdateProfileService;
describe('UpdateProfile', () => {

  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    updateProfileService = new UpdateProfileService(fakeHashProvider, fakeUsersRepository);
  })

  it('should be able to update an user', async () => {
    const user = await fakeUsersRepository.create({
      email: 'john@doe.com',
      name: 'John Doe',
      password: '123'
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      email: 'john2@doe.com',
      name: 'John Dois',
    });

    expect(updatedUser.name).toBe('John Dois');
    expect(updatedUser.email).toBe('john2@doe.com');
  });

  it('should not be able to update the email to an already existing one', async () => {
    await fakeUsersRepository.create({
      email: 'teste@doe.com',
      name: 'John Teste',
      password: '123'
    });

    const user = await fakeUsersRepository.create({
      email: 'john@doe.com',
      name: 'John Doe',
      password: '123'
    });

    await expect(updateProfileService.execute({
      user_id: user.id,
      email: 'teste@doe.com',
      name: 'John Doe'
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should be able to update an user password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'john@doe.com',
      name: 'John Doe',
      password: '123'
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      email: 'john@doe.com',
      name: 'John Doe',
      password: {
        new: '123123',
        old: '123'
      }
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update an user password with the wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'john@doe.com',
      name: 'John Doe',
      password: '123'
    });

    await expect(updateProfileService.execute({
      user_id: user.id,
      email: 'john@doe.com',
      name: 'John Doe',
      password: {
        new: '123123',
        old: '1234'
      }
    })).rejects.toBeInstanceOf(AppError);
  });

   it('should not be able to update an user password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'john@doe.com',
      name: 'John Doe',
      password: '123'
    });

    await expect(updateProfileService.execute({
      user_id: user.id,
      email: 'john@doe.com',
      name: 'John Doe',
      password: {
        new: '123123',
      }
    })).rejects.toBeInstanceOf(AppError);
  });

   it('should not be able to update the password of an invalid user', async () => {
    await expect(updateProfileService.execute({
      user_id: 'non-existing-user',
      email: 'john@doe.com',
      name: 'John Doe',
      password: {
        new: '123123',
        old: '1234'
      }
    })).rejects.toBeInstanceOf(AppError);
  });

})
