import Appointment from '../models/Appointment';
import { isEqual } from 'date-fns';

interface AppointmentDTO{
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public create({provider, date }: AppointmentDTO): Appointment{
    const appointment = new Appointment({provider, date});

    this.appointments.push(appointment);
    return appointment;
  }

  public findOnTheSameDate(date: Date): boolean{
    const findAppointmentOnTheSameDate = this.appointments.find(appointment => isEqual(date, appointment.date));

    if(findAppointmentOnTheSameDate) return true;

    return false;
  }

  public all(): Appointment[] {
    return this.appointments;
  }

}

export default AppointmentsRepository;
