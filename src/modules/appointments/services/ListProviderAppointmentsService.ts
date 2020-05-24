import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface AvailabilityRequest {
  userID: string;
  month: number;
  year: number;
  day: number;
}


export default class ListProviderAppointmentsService{

  constructor(private appointmentsRepository: IAppointmentsRepository){}

  public async execute({userID, day, month, year}: AvailabilityRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAppointmentsInDayFromProvider({
      day,
      month,
      user_id: userID,
      year
    });

    return appointments;
  }
}
