import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/fakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointmentsService: ListProviderAppointmentsService;
describe('ProviderAppointments', () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointmentsService = new ListProviderAppointmentsService(fakeAppointmentsRepository, fakeCacheProvider);
  });

  it('It should be able to list the provider appointments on a specific day', async () => {

    const appointment1 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 15, 9, 0, 0),
      provider_id: 'provider',
      user_id: 'user'
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 15, 10, 0, 0),
      provider_id: 'provider',
      user_id: 'user'
    });

    const appointments = await listProviderAppointmentsService.execute({
      day: 15,
      month: 5,
      year: 2020,
      userID: 'provider'
    });

    expect(appointments).toEqual([
      appointment1,
      appointment2
    ]);

  });
});
