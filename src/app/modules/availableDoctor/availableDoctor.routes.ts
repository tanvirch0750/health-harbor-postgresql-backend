import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AvailableDoctorController } from './availableDoctor.controller';
import { AvailableDoctorValidation } from './availableDoctor.validation';

const router = express.Router();

router.get('/:id', AvailableDoctorController.getDataById);

router.delete('/:id', AvailableDoctorController.deleteDataById);

router.patch(
  '/:id',
  validateRequest(AvailableDoctorValidation.update),
  AvailableDoctorController.updateDataById
);

router.post(
  '/',
  validateRequest(AvailableDoctorValidation.create),
  AvailableDoctorController.insertIntoDB
);

router.get('/', AvailableDoctorController.getAllFromDB);

export const availabledoctorRoutes = router;
