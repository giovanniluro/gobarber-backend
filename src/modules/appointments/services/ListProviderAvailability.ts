import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getDaysInMonth, getDate,  isAfter } from 'date-fns';

interface AvailabilityRequest {
  userID: string;
  month: number;
  year: number;
}

type AvailabilityResponse = Array <{
  day: number;
  available: boolean;
}>;

export default class ListProviderAvailability {

  constructor(private appointmentsRepository: IAppointmentsRepository){}

  public async execute({userID, month, year}: AvailabilityRequest): Promise<AvailabilityResponse> {

    const appointments = await this.appointmentsRepository.findAllInMonth({
      month,
      year,
      user_id: userID
    })

    const daysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from({
      length: daysInMonth
    }, (_, index) => index + 1);

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => getDate(appointment.date) === day);
      const compareDate = new Date(year, month - 1, day, 23, 59, 59);

      return {
        day,
        available: isAfter(compareDate, new Date()) && appointmentsInDay.length < 10
      }

    })

    return availability;
  }
}
