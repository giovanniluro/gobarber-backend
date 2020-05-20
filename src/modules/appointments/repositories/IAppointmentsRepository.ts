import Appointment from "../infra/typeorm/entities/Appointment";
import { ICreateAppointmentDTO, IFindAllInMonthDTO, IFindAllInDay } from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository{
  findOnTheSameDate(date: Date): Promise<Appointment | undefined>;
  create(data:ICreateAppointmentDTO): Promise<Appointment>;
  findAllInMonth(data: IFindAllInMonthDTO): Promise<Appointment[]>;
  findAppointmentsInDayFromProvider(data: IFindAllInDay): Promise<Appointment[]>;
}
