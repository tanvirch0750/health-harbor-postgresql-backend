import express from 'express';
import { specializationRoutes } from '../modules/specialization/specialization.routes';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/specialization',
    route: specializationRoutes,
  },
];

// Application Routes
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
