import express from 'express';
import { doctorRoutes } from '../modules/doctor/doctor.routes';
import { specializationRoutes } from '../modules/specialization/specialization.routes';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/specialization',
    route: specializationRoutes,
  },
  {
    path: '/doctor',
    route: doctorRoutes,
  },
];

// Application Routes
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
