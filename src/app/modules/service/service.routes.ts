import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { ServiceController } from './service.controller';
import { ServiceValidation } from './service.validation';

const router = express.Router();

router.get('/:id', ServiceController.getDataById);

router.delete('/:id', ServiceController.deleteDataById);

router.patch(
  '/:id',
  validateRequest(ServiceValidation.update),
  ServiceController.updateDataById
);

router.post(
  '/',
  validateRequest(ServiceValidation.create),
  ServiceController.insertIntoDB
);

router.get('/', ServiceController.getAllFromDB);

export const serviceRoutes = router;
