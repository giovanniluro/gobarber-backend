import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import AppointmentController from '../../../controllers/AppointmentController';

const appointmentRoutes = Router();
const appointmentController = new AppointmentController();
appointmentRoutes.use(ensureAuthenticated);

appointmentRoutes.post('/', appointmentController.create);

// appointmentRoutes.get('/', async (request, response) => {
//   const appointments = await this.appointmentsRepository.find();

//   return response.json(appointments);
// });

export default appointmentRoutes;
