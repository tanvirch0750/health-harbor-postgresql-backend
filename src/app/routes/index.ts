import express from 'express';
import { adminRoutes } from '../modules/admin/admin.routes';
import { availabledoctorRoutes } from '../modules/availableDoctor/availableDoctor.routes';
import { availableServiceRoutes } from '../modules/availableService/availableService.routes';
import { doctorRoutes } from '../modules/doctor/doctor.routes';
import { paymentRoutes } from '../modules/payment/payment.routes';
import { serviceRoutes } from '../modules/service/service.routes';
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
    path: '/available-doctor',
    route: availabledoctorRoutes,
  },
  {
    path: '/time-slot',
    route: timeSlotsRoutes,
  },
  {
    path: '/service',
    route: serviceRoutes,
  },
  {
    path: '/available-service',
    route: availableServiceRoutes,
  },
  {
    path: '/admin',
    route: adminRoutes,
  },
  {
    path: '/payment',
    route: paymentRoutes,
  },
];

// Application Routes
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
