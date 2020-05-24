import ListProviderAppointmentsService from '../services/ListProviderAppointmentsService';
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';
import {Request, Response} from 'express';

export default class ProviderAppointmentController {

  public async index(request: Request, response: Response): Promise<Response>{
    const provider_id = request.user.id;
    const { day, month, year} = request.body;

    const appointmentsRepository = new AppointmentsRepository();
    const listProviderAppointmentssService = new ListProviderAppointmentsService(appointmentsRepository);

    const appointments = await listProviderAppointmentssService.execute({
      day,
      month,
      year,
      userID: provider_id
    });

    return response.json(appointments);
  }

}
