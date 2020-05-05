import Appointment from '../models/Appointment';
import { isEqual } from 'date-fns';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>{

  public async findOnTheSameDate(date: Date): Promise<Appointment | null>{
    const found = await this.findOne({
      where: { date }
    })

    return found || null ;
  }

}

export default AppointmentsRepository;
