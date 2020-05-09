import { Router } from 'express';
import UsersController from '../../../controllers/UsersController';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';

const upload = multer(uploadConfig)
const userRoutes = Router();
const usersController = new UsersController();

userRoutes.post('/', usersController.create);

userRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), usersController.updateAvatar);

export default userRoutes;
