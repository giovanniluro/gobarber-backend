import { Router, request } from 'express';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/updateUserAvatarService';

const upload = multer(uploadConfig);

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

userRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar') ,async (request, response) => {
  try {
    const updateUserAvatarService = new UpdateUserAvatarService();

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatar_url: request.file.filename
    })

    return response.json(user)
  } catch (err) {
    return response.status(400).json({error: err.message});
  }
});

export default userRoutes;
