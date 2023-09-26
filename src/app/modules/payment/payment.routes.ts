import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { PaymentController } from './payment.controller';
import { PaymentValidation } from './payment.validation';
const router = express.Router();

router.get('/:id', PaymentController.getDataById);

router.delete('/:id', PaymentController.deleteDataById);

router.patch(
  '/:id',
  validateRequest(PaymentValidation.update),
  PaymentController.updateDataById
);

router.post(
  '/',
  validateRequest(PaymentValidation.create),
  PaymentController.insertIntoDB
);

router.get('/', PaymentController.getAllFromDB);

export const paymentRoutes = router;
