import { Request, Response } from 'express';
import ListProviderAvailability from '../services/ListProviderAvailability';
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';

export default class MonthAvailabilityProviderController {

  public async index(request: Request, response: Response){
    const appointmentsRepository = new AppointmentsRepository();
    const listProviderAvailability = new ListProviderAvailability(appointmentsRepository);
    const { month, year} = request.query;
    const provider_id = request.params.id;

    const availability = await listProviderAvailability.execute({
      month: Number(month),
      userID: provider_id,
      year: Number(year)
    });

    return response.json(availability);
  }

}
