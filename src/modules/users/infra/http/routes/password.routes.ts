import { Router } from 'express';
import ForgotPasswordController from '@modules/users/controllers/ForgotPasswordController';
import ResetPasswordController from '@modules/users/controllers/ResetPasswordController'

const passwordRoutes = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post('/forgot', forgotPasswordController.create);
passwordRoutes.post('/reset', resetPasswordController.create);

export default passwordRoutes;
