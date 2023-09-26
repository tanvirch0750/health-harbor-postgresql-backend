import { z } from 'zod';

const create = z.object({
  body: z.object({
    amount: z.string({
      required_error: 'Payment amount is required',
    }),
    paymentDate: z.date({
      required_error: 'Payment date is required',
    }),
    appointmentId: z.string({
      required_error: 'Appointment id is required',
    }),

    paymentStatus: z.boolean().optional(),
  }),
});

const update = z.object({
  body: z.object({
    amount: z.string().optional(),
    paymentDate: z.date().optional(),
    appointmentId: z.string().optional(),
    paymentStatus: z.boolean().optional(),
  }),
});

export const PaymentValidation = {
  create,
  update,
};
