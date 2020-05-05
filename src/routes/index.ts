import { Router } from 'express';
import appointmentRoutes from './appointments.routes';
import userRoutes from './users.routes';
import sessionRoutes from './session.routes';

const routes = Router();

routes.use('/appointments', appointmentRoutes);
routes.use('/users', userRoutes);
routes.use('/auth', sessionRoutes);

export default routes;
