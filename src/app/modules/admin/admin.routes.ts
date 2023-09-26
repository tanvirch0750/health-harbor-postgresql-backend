import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';

const router = express.Router();

router.get('/:id', AdminController.getDataById);

router.delete('/:id', AdminController.deleteDataById);

router.patch(
  '/:id',
  validateRequest(AdminValidation.update),
  AdminController.updateDataById
);

router.post(
  '/',
  validateRequest(AdminValidation.create),
  AdminController.insertIntoDB
);

router.get('/', AdminController.getAllFromDB);

export const adminRoutes = router;
