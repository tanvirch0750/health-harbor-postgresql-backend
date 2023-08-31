import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { DoctorController } from './doctor.controller';
import { DoctorValidation } from './doctor.validation';
const router = express.Router();

router.get('/:id', DoctorController.getDataById);

router.delete('/:id', DoctorController.deleteDataById);

router.patch(
  '/:id',
  validateRequest(DoctorValidation.update),
  DoctorController.updateDataById
);

router.post(
  '/',
  validateRequest(DoctorValidation.create),
  DoctorController.insertIntoDB
);

router.get('/', DoctorController.getAllFromDB);

export const doctorRoutes = router;
