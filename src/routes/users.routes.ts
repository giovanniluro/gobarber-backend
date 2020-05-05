import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const userRoutes = Router();

userRoutes.post('/', async (request, response) => {
  try{
    const createUserService = new CreateUserService();
    const { name, email, password } = request.body;

    const user = await createUserService.execute({name, password, email});

    return response.json(user);
  } catch(err){
    return response.json(err);
  }
});

export default userRoutes;
