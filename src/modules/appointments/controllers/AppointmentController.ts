import { Request, Response } from 'express';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationRepository';
import { parseISO } from 'date-fns';

export default class AppointmentController {
  public async create(request: Request, response: Response ): Promise<Response> {
    const appointmentsRepository = new AppointmentsRepository();
    const notificationsRepository = new NotificationsRepository();
    const createAppointment = new CreateAppointmentService(appointmentsRepository, notificationsRepository);
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const appointment = await createAppointment.execute({ provider_id, date: parsedDate, user_id });

    return response.json(appointment);
  }
}
