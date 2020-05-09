import { Router } from 'express';
import appointmentRoutes from '@modules/appointments/infra/http/routes/appointments.routes';
import userRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionRoutes from '@modules/users/infra/http/routes/session.routes';

const routes = Router();

routes.use('/appointments', appointmentRoutes);
routes.use('/users', userRoutes);
routes.use('/auth', sessionRoutes);

export default routes;
