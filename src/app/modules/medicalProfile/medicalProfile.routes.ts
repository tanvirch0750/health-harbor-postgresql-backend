import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { MedicalProfileController } from './medicalProfile.controller';
import { MedicalProfileValidation } from './medicalProfile.validation';

const router = express.Router();

router.get('/:id', MedicalProfileController.getDataById);

router.delete('/:id', MedicalProfileController.deleteDataById);

router.patch(
  '/:id',
  validateRequest(MedicalProfileValidation.update),
  MedicalProfileController.updateDataById
);

router.get('/', MedicalProfileController.getAllFromDB);

export const medicalProfileRoutes = router;
