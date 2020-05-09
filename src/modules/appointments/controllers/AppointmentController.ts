import { Request, Response } from 'express';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import { parseISO } from 'date-fns';

export default class AppointmentController {
  public async create(request: Request, response: Response ): Promise<Response> {
    const appointmentsRepository = new AppointmentsRepository();
    const createAppointment = new CreateAppointmentService(appointmentsRepository);
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const appointment = await createAppointment.execute({ provider_id, date: parsedDate });

    return response.json(appointment);
  }
}
