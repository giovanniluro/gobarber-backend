import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/fakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';


let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

  })

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({ date: new Date(), provider_id: '1', user_id: '2' });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1');
  });

  it('should not be able to create two appointments on the same date', async () => {
    const appointmentDate = new Date();

    const appointment = await createAppointment.execute({ date: appointmentDate, provider_id: '1', user_id: '2' });

    await expect(createAppointment.execute({ date: appointmentDate, provider_id: '1', user_id: '2' })).rejects.toBeInstanceOf(AppError);
  });


  it('It should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 3, 10, 12).getTime();
    });

    await expect(createAppointment.execute({ date: new Date(2020, 3, 10, 10), provider_id: '1', user_id: '1' })).rejects.toBeInstanceOf(AppError);

  });

  it('It should not be able to create an appointment with the provider being the user', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 3, 10, 12).getTime();
    });

    await expect(createAppointment.execute({ date: new Date(2020, 3, 10, 13), provider_id: '1', user_id: '1' })).rejects.toBeInstanceOf(AppError);

  });

   it('It should not be able to create an appointment outside 8h-17h range', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 3, 10, 12).getTime();
    });

    await expect(createAppointment.execute({ date: new Date(2020, 3, 11, 7), provider_id: '1', user_id: '2' })).rejects.toBeInstanceOf(AppError);

    await expect(createAppointment.execute({ date: new Date(2020, 3, 11, 18), provider_id: '1', user_id: '2' })).rejects.toBeInstanceOf(AppError);

  });

});
