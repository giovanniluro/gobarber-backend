import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { isAfter, getHours } from 'date-fns';

interface AvailabilityRequest {
  userID: string;
  day: number;
  month: number;
  year: number;
}

type AvailabilityResponse = Array<{
  hour: number;
  available: boolean;
}>;

export default class ListProviderDayAvailability {

  constructor(private appointmentsRepository: IAppointmentsRepository) { }

  public async execute({ day, userID, month, year }: AvailabilityRequest): Promise<AvailabilityResponse> {

    const appointments = await this.appointmentsRepository.findAppointmentsInDayFromProvider({
      day,
      month,
      user_id: userID,
      year
    });

    const startHour = 8

    const eachHourArray = Array.from({ length: 10 }, (_, index) => index + startHour);

    const currDate = new Date(Date.now());

    const availabilityArray = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(appointment =>
        getHours(appointment.date) === hour
      )

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currDate),
      }
    })

    return availabilityArray;
  }
}
