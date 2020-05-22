import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { ICreateAppointmentDTO, IFindAllInMonthDTO, IFindAllInDay } from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate} from 'date-fns';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findOnTheSameDate(date: Date): Promise<Appointment | undefined> {
    const foundAppointment = this.appointments.find(appointment => isEqual(appointment.date, date));

    return foundAppointment;
  };


  public async create({ provider_id, date, user_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

    this.appointments.push(appointment);

    return appointment;
  };

  public async findAllInMonth({ month, user_id, year }: IFindAllInMonthDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment =>
      appointment.provider_id === user_id && getMonth(appointment.date) === month - 1 && getYear(appointment.date) === year);

    return appointments;
  }

  public async findAppointmentsInDayFromProvider({ day, month, year, user_id }: IFindAllInDay): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment =>
      appointment.provider_id === user_id && getDate(appointment.date) === day && getMonth(appointment.date) === month - 1 && getYear(appointment.date) === year);

    return appointments;
  }
}

export default AppointmentsRepository;
