import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm'

class CreateAppointmentService {

  public async execute({ date, provider }: Omit<Appointment, 'id'>): Promise<Appointment> {

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const startDate = startOfHour(date);

    const foundAppointment = await appointmentsRepository.findOnTheSameDate(startDate);

    if (foundAppointment) {
      throw new Error("Appointment already dated!");
    }

    const appointment = appointmentsRepository.create({ provider, date: startDate });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
