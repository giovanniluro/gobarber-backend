import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import AppointmentController from '../../../controllers/AppointmentController';
import ProviderAppointmentController from '../../../controllers/ProviderAppointmentController';

const appointmentRoutes = Router();
const providerAppointmentController = new ProviderAppointmentController();
const appointmentController = new AppointmentController();
appointmentRoutes.use(ensureAuthenticated);

appointmentRoutes.post('/', celebrate({
  [Segments.BODY]: {
    provider_id: Joi.string().uuid().required(),
    date: Joi.date()
  }
}), appointmentController.create);
appointmentRoutes.get('/me',providerAppointmentController.index);

export default appointmentRoutes;
