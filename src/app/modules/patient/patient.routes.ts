import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { PatientController } from './patient.controller';
import { PatientValidation } from './patient.validation';

const router = express.Router();

router.get('/:id', PatientController.getDataById);

router.delete('/:id', PatientController.deleteDataById);

router.patch(
  '/:id',
  validateRequest(PatientValidation.update),
  PatientController.updateDataById
);

router.post(
  '/',
  validateRequest(PatientValidation.create),
  PatientController.insertIntoDB
);

router.get('/', PatientController.getAllFromDB);

export const patientRoutes = router;
