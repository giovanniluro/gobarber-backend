import { Router } from 'express';
import UsersController from '../../../controllers/UsersController';

const sessionRouter = Router();
const usersController = new UsersController();

sessionRouter.post('/', usersController.auth);

export default sessionRouter;
