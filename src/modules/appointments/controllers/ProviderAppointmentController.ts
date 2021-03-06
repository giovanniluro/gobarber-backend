import ListProviderAppointmentsService from '../services/ListProviderAppointmentsService';
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';
import {Request, Response} from 'express';
import RedisCacheProvider from '@shared/container/providers/CacheProvider/implementations/RedisCacheProvider';
import { classToClass } from 'class-transformer';

export default class ProviderAppointmentController {

  public async index(request: Request, response: Response): Promise<Response>{
    const provider_id = request.user.id;
    const { day, month, year} = request.query;

    const cacheProvider = new RedisCacheProvider();
    const appointmentsRepository = new AppointmentsRepository();
    const listProviderAppointmentssService = new ListProviderAppointmentsService(appointmentsRepository, cacheProvider);

    const appointments = await listProviderAppointmentssService.execute({
      day: Number(day),
      month: Number(month),
      year: Number(year),
      userID: provider_id
    });

    return response.json(classToClass(appointments));
  }

}
