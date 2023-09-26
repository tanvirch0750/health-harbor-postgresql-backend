import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AvailableServiceController } from './availableService.controller';
import { AvailableServiceValidation } from './availableService.validation';

const router = express.Router();

router.get('/:id', AvailableServiceController.getDataById);

router.delete('/:id', AvailableServiceController.deleteDataById);

router.patch(
  '/:id',
  validateRequest(AvailableServiceValidation.update),
  AvailableServiceController.updateDataById
);

router.post(
  '/',
  validateRequest(AvailableServiceValidation.create),
  AvailableServiceController.insertIntoDB
);

router.get('/', AvailableServiceController.getAllFromDB);

export const availableServiceRoutes = router;
