import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface AppointmentDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {

  constructor(private appointmentsRepository: IAppointmentsRepository){}

  public async execute({ date, provider_id}: AppointmentDTO): Promise<Appointment> {

    const startDate = startOfHour(date);

    const foundAppointment = await this.appointmentsRepository.findOnTheSameDate(startDate);

    if (foundAppointment) {
      throw new AppError("Appointment already dated!", 401);
    }

    const appointment = await this.appointmentsRepository.create({ provider_id, date: startDate });

    return appointment;
  }
}

export default CreateAppointmentService;
