import { z } from 'zod';

const create = z.object({
  body: z.object({
    slotDate: z.date({
      required_error: 'Slot Date is required',
    }),
    availableSeats: z.number({
      required_error: 'Available Seats number is required',
    }),
    fees: z.string({
      required_error: 'Service fee is required',
    }),
    serviceId: z.string({
      required_error: 'Service ID is required',
    }),
    slotId: z.string({
      required_error: 'Slot ID is required',
    }),
    availableDoctorId: z.string({
      required_error: 'Available Doctor ID is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    slotDate: z.string().optional(),
    availableSeats: z.string().optional(),
    fees: z.string().optional(),
    serviceId: z.string().optional(),
    slotId: z.string().optional(),
    availableDoctorId: z.string().optional(),
  }),
});

export const AvailableServiceValidation = {
  create,
  update,
};
