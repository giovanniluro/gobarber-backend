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
    const appointment = await createAppointment.execute({ date: new Date(), provider_id: '1' });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1');
  });

  it('should not be able to create two appointments on the same date', async () => {
    const appointmentDate = new Date();

    const appointment = await createAppointment.execute({ date: appointmentDate , provider_id: '1' });

    await expect(createAppointment.execute({ date: appointmentDate , provider_id: '1' })).rejects.toBeInstanceOf(AppError);
  });

});
