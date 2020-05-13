import { Router } from 'express';
import appointmentRoutes from '@modules/appointments/infra/http/routes/appointments.routes';
import userRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionRoutes from '@modules/users/infra/http/routes/session.routes';
import passwordRoutes from '@modules/users/infra/http/routes/password.routes';

const routes = Router();

routes.use('/appointments', appointmentRoutes);
routes.use('/users', userRoutes);
routes.use('/auth', sessionRoutes);
routes.use('/password', passwordRoutes);

export default routes;
