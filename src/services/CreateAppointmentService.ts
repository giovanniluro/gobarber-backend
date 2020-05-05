import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm'

interface AppointmentDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {

  public async execute({ date, provider_id}: AppointmentDTO): Promise<Appointment> {

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const startDate = startOfHour(date);

    const foundAppointment = await appointmentsRepository.findOnTheSameDate(startDate);

    if (foundAppointment) {
      throw new Error("Appointment already dated!");
    }

    const appointment = appointmentsRepository.create({ provider_id, date: startDate });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
