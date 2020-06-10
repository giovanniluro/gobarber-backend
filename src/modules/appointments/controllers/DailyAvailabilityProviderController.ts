import { Request, Response } from 'express';
import ListProviderDailyAvailability from '../services/ListProviderDayAvailability';
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';

export default class DailyAvailabilityProviderController {

  public async index(request: Request, response: Response){
    const appointmentsRepository = new AppointmentsRepository();
    const listProviderDailyAvailability = new ListProviderDailyAvailability(appointmentsRepository);
    const { day, month, year } = request.query;
    const provider_id = request.params.id;

    const availability = await listProviderDailyAvailability.execute({
      month: Number(month),
      userID: provider_id,
      year: Number(year),
      day: Number(day)
    });

    return response.json(availability);
  }

}
