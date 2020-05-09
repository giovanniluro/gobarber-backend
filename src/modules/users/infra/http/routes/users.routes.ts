import { Router } from 'express';
import UsersController from '../../../controllers/UsersController';
import UserAvatarController from'../../../controllers/UserAvatarController';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';

const upload = multer(uploadConfig)
const userRoutes = Router();
const usersController = new UsersController();
const avatarController = new UserAvatarController();

userRoutes.post('/', usersController.create);

userRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), avatarController.update);

export default userRoutes;
