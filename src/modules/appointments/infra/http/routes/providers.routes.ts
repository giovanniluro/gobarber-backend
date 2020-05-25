import { Router } from 'express';
import ProviderController from '../../../controllers/ProviderController';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import MonthAvailabilityController from '../../../controllers/MonthAvailabilityProviderController';
import DailyAvailabilityProviderController from '../../../controllers/DailyAvailabilityProviderController';
import { Segments, celebrate, Joi } from 'celebrate';

const providerRoutes = Router();
const providerController = new ProviderController();
const dailyAvailabilityController = new DailyAvailabilityProviderController();
const monthAvailabilityController = new MonthAvailabilityController();

providerRoutes.use(ensureAuthenticated);
providerRoutes.get('/:id/month-availability', celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required()
  }
}) , monthAvailabilityController.index);
providerRoutes.get('/:id/daily-availability', dailyAvailabilityController.index);
providerRoutes.get('/', providerController.index);


export default providerRoutes;

