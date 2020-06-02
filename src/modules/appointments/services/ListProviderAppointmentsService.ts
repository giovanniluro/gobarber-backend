import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface AvailabilityRequest {
  userID: string;
  month: number;
  year: number;
  day: number;
}


export default class ListProviderAppointmentsService {

  constructor(private appointmentsRepository: IAppointmentsRepository, private cacheProvider: ICacheProvider) { }

  public async execute({ userID, day, month, year }: AvailabilityRequest): Promise<Appointment[]> {

    let appointments = await this.cacheProvider.recover<Appointment[]>(`provider-appointments:${userID}:${year}-${month}-${day}`);

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAppointmentsInDayFromProvider({
        day,
        month,
        user_id: userID,
        year
      });

      await this.cacheProvider.save(`provider-appointments:${userID}:${year}-${month}-${day}`, appointments);
    }

    return appointments;
  }
}
