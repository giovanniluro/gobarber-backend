import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authUser = new AuthenticateUserService();

  const auth = await authUser.execute({ email, password });

  return response.json(auth);
});

export default sessionRouter;
