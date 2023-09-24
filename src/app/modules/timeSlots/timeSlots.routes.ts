import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { TimeSlotsController } from './timeSlots.controller';
import { TimeSlotsValidation } from './timeSlots.validation';

const router = express.Router();

router.get('/:id', TimeSlotsController.getDataById);

router.delete('/:id', TimeSlotsController.deleteDataById);

router.patch(
  '/:id',
  validateRequest(TimeSlotsValidation.update),
  TimeSlotsController.updateDataById
);

router.post(
  '/',
  validateRequest(TimeSlotsValidation.create),
  TimeSlotsController.insertIntoDB
);

router.get('/', TimeSlotsController.getAllFromDB);

export const timeSlotsRoutes = router;
