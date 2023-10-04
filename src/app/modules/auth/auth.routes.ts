import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signin',
  validateRequest(AuthValidation.userLogin),
  AuthController.signinUser
);

router.post('/refresh-token', AuthController.refreshToken);

export const authRoutes = router;
