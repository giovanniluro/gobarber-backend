import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { getRepository, Repository, Raw } from 'typeorm';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import {ICreateAppointmentDTO, IFindAllInMonthDTO} from '@modules/appointments/dtos/ICreateAppointmentDTO';

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

  public async create({provider_id, date}:ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({provider_id, date});
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
}

export default AppointmentsRepository;
