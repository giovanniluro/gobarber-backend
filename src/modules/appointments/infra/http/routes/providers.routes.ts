import { Router } from 'express';
import ProviderController from '../../../controllers/ProviderController';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';

const providerRoutes = Router();
const providerController = new ProviderController();

providerRoutes.use(ensureAuthenticated);

providerRoutes.get('/', providerController.index);


export default providerRoutes;

