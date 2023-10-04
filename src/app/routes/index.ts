import express from 'express';
import { adminRoutes } from '../modules/admin/admin.routes';
import { appointmentRoutes } from '../modules/appointment/appointment.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { availabledoctorRoutes } from '../modules/availableDoctor/availableDoctor.routes';
import { availableServiceRoutes } from '../modules/availableService/availableService.routes';
import { doctorRoutes } from '../modules/doctor/doctor.routes';
import { medicalProfileRoutes } from '../modules/medicalProfile/medicalProfile.routes';
import { patientRoutes } from '../modules/patient/patient.routes';
import { paymentRoutes } from '../modules/payment/payment.routes';
import { serviceRoutes } from '../modules/service/service.routes';
import { specializationRoutes } from '../modules/specialization/specialization.routes';
import { timeSlotsRoutes } from '../modules/timeSlots/timeSlots.routes';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/specialization',
    route: specializationRoutes,
  },
  {
    path: '/doctor',
    route: doctorRoutes,
  },
  {
    path: '/patient',
    route: patientRoutes,
  },
  {
    path: '/medical-profile',
    route: medicalProfileRoutes,
  },
  {
    path: '/admin',
    route: adminRoutes,
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
    path: '/payment',
    route: paymentRoutes,
  },
  {
    path: '/appointment',
    route: appointmentRoutes,
  },
];

// Application Routes
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
