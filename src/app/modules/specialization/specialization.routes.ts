import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { SpecializationController } from './specialization.controller';
import { SpecializationValidation } from './specialization.validation';
const router = express.Router();

router.get('/:id', SpecializationController.getDataById);

router.delete('/:id', SpecializationController.deleteDataById);

router.patch(
  '/:id',
  validateRequest(SpecializationValidation.update),
  SpecializationController.updateDataById
);

router.post(
  '/',
  validateRequest(SpecializationValidation.create),
  SpecializationController.insertIntoDB
);

router.get('/', SpecializationController.getAllFromDB);

export const specializationRoutes = router;
