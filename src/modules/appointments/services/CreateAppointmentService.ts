import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { startOfHour, isBefore, addHours, getHours, format } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface AppointmentDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}

class CreateAppointmentService {

  constructor(private appointmentsRepository: IAppointmentsRepository, private notificationsRepository: INotificationsRepository, private cacheProvider: ICacheProvider){}

  public async execute({ date, provider_id, user_id}: AppointmentDTO): Promise<Appointment> {

    const startDate = startOfHour(date);

    const foundAppointment = await this.appointmentsRepository.findOnTheSameDate(
      startDate,
      provider_id
      );

    if(isBefore(date, addHours(Date.now(), -1))){
      throw new AppError('You cant make an appointment in the past :p');
    }

    if(user_id === provider_id) {
      throw new AppError('You cant create an appointment with yourself');
    }

    if(getHours(date) < 8 || getHours(date) > 17) {
      throw new AppError('You must create your appointment between 8am and 5pm');
    }

    if (foundAppointment) {
      throw new AppError("Appointment already dated!", 401);
    }

    const appointment = await this.appointmentsRepository.create({ provider_id, date: startDate, user_id });

    const formatedDate = format(date, "dd/MM/yyyy 'às' HH:mm");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para ${formatedDate}`
    });

    this.cacheProvider.invalidate(`provider-appointments:${user_id}:${format(date, 'yyyy-M-d')}`);

    return appointment;
  }
}

export default CreateAppointmentService;
