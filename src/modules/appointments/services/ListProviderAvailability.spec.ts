import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/fakeAppointmentsRepository';
import ListProviderAvailability from './ListProviderAvailability';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAvailability: ListProviderAvailability;
describe('ProviderAvailability', () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAvailability = new ListProviderAvailability(fakeAppointmentsRepository);
  });

  it('It should be able to list the available days of a provider', async () => {

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 10, 8, 0, 0),
      provider_id: 'user',
      user_id: 'user'
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 10, 9, 0, 0),
      provider_id: 'user',
      user_id: 'user'
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 15, 10, 0, 0),
      provider_id: 'user',
      user_id: 'user'
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 15, 8, 0, 0),
      provider_id: 'user',
      user_id: 'user'
    });

    const availability = await listProviderAvailability.execute({
      month: 5,
      year: 2020,
      userID: 'user'
    });

    expect(availability).toEqual(expect.arrayContaining([
      {day: 10, available: false},
      {day: 15, available: false},
      {day: 11, available: true},
      {day: 16, available: true}
    ]))

  });
});
