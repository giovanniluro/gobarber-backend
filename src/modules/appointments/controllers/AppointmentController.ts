import { Request, Response } from 'express';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationRepository';
import { parseISO } from 'date-fns';
import RedisCacheProvider from '@shared/container/providers/CacheProvider/implementations/RedisCacheProvider';

export default class AppointmentController {
  public async create(request: Request, response: Response ): Promise<Response> {
    const appointmentsRepository = new AppointmentsRepository();
    const notificationsRepository = new NotificationsRepository();
    const cacheProvider = new RedisCacheProvider();
    const createAppointment = new CreateAppointmentService(appointmentsRepository, notificationsRepository, cacheProvider);
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const appointment = await createAppointment.execute({ provider_id, date, user_id });

    return response.json(appointment);
  }
}
