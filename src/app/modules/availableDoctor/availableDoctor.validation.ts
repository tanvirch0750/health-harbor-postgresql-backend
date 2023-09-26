import { z } from 'zod';

const create = z.object({
  body: z.object({
    availableDate: z.date({
      required_error: 'Available Date is required',
    }),
    doctorId: z.string({
      required_error: 'Service ID is required',
    }),
    slotId: z.string({
      required_error: 'Slot ID is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    availableDate: z.string().optional(),
    slotId: z.string().optional(),
    doctorId: z.string().optional(),
  }),
});

export const AvailableDoctorValidation = {
  create,
  update,
};
