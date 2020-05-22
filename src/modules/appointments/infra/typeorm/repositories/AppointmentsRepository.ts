import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { getRepository, Repository, Raw } from 'typeorm';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import {ICreateAppointmentDTO, IFindAllInMonthDTO, IFindAllInDay} from '@modules/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository{

  private ormRepository: Repository<Appointment>;

  constructor(){
    this.ormRepository = getRepository(Appointment);
  }

  public async findOnTheSameDate(date: Date): Promise<Appointment | undefined>{
    const found = await this.ormRepository.findOne({
      where: { date }
    })

    return found;
  };

  public async create({provider_id, date, user_id}:ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({provider_id, date, user_id});
    await this.ormRepository.save(appointment);

    return appointment;
  };

  public async findAllInMonth({month, year, user_id}: IFindAllInMonthDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id: user_id,
        date: Raw(dateFieldName => `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`)
      }
    });

    return appointments;
  }

  public async findAppointmentsInDayFromProvider({day, month, year, user_id}: IFindAllInDay): Promise<Appointment[]>{
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');


    const appointments = await this.ormRepository.find({
      where: {
        provider_id: user_id,
        date: Raw(dateFieldName => `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`)
      }
    });

    return appointments;
  }
}

export default AppointmentsRepository;
