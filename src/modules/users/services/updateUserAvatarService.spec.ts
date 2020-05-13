import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateUserAvatar from '@modules/users/services/updateUserAvatarService';
import AppError from '@shared/errors/AppError';

describe('UpdateUserAvatar', () => {
  it('should be able to update the avatar', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const updateUserAvatarService = new UpdateUserAvatar(fakeUsersRepository, fakeStorageProvider);

    const user = await fakeUsersRepository.create({
      email: 'john@doe.com',
      name: 'John Doe',
      password: '123'
    })

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatar_url: 'avatar.jpg'
    })

    expect(user.avatar_url).toBe('avatar.jpg');
  });

  it('should not be able to update avatar for non existing user', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const updateUserAvatarService = new UpdateUserAvatar(fakeUsersRepository, fakeStorageProvider);

    await expect(updateUserAvatarService.execute({
      user_id: '1',
      avatar_url: 'avatar.jpg'
    })).rejects.toBeInstanceOf(AppError);

  })

  it('should be able to delete the old avatar when updating a new one', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const updateUserAvatarService = new UpdateUserAvatar(fakeUsersRepository, fakeStorageProvider);

    const deleteFile = spyOn(fakeStorageProvider, 'delete');

    const user = await fakeUsersRepository.create({
      email: 'john@doe.com',
      name: 'John Doe',
      password: '123'
    })

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatar_url: 'avatar.jpg'
    })

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatar_url: 'avatar2.jpg'
    })

    expect(deleteFile).toBeCalledWith('avatar.jpg');
    expect(user.avatar_url).toBe('avatar2.jpg');
  });

});
