import express from 'express';
import { doctorRoutes } from '../modules/doctor/doctor.routes';
import { specializationRoutes } from '../modules/specialization/specialization.routes';
import { timeSlotsRoutes } from '../modules/timeSlots/timeSlots.routes';
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
  {
    path: '/time-slot',
    route: timeSlotsRoutes,
  },
];

// Application Routes
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
