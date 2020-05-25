import { Router } from 'express';
import ForgotPasswordController from '@modules/users/controllers/ForgotPasswordController';
import ResetPasswordController from '@modules/users/controllers/ResetPasswordController';
import { Joi, Segments, celebrate } from 'celebrate';

const passwordRoutes = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post('/forgot', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required()
  }
}), forgotPasswordController.create);
passwordRoutes.post('/reset', celebrate({
  [Segments.BODY]: {
    token: Joi.string().uuid().required(),
    password: Joi.string().required(),

  }
}), resetPasswordController.create);

export default passwordRoutes;
