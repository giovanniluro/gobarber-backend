import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/fakeAppointmentsRepository';
import ListProviderDayAvailability from './ListProviderDayAvailability';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailability;
describe('ProviderAvailability', () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailability(fakeAppointmentsRepository);
  });

  it('It should be able to list the availability of hours in a day', async () => {

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 10, 14, 0, 0),
      provider_id: 'user'
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 10, 15, 0, 0),
      provider_id: 'user'
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 11).getTime();
    })

    const availability = await listProviderDayAvailability.execute({
      day: 10,
      month: 5,
      year: 2020,
      userID: 'user'
    });

    expect(availability).toEqual(expect.arrayContaining([
      {hour: 8, available: false},
      {hour: 10, available: false},
      {hour: 13, available: true},
      {hour: 14, available: false},
      {hour: 15, available: false},
    ]))

  });

});
