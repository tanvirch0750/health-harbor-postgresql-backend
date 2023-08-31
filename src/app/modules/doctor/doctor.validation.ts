import { z } from 'zod';

const create = z.object({
  body: z.object({
    fullName: z.string({
      required_error: 'Full name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
    role: z.string().optional(),
    qualification: z.string({
      required_error: 'Qualification is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    isPasswordReset: z.boolean().optional(),
    specializationId: z.string({
      required_error: 'Specialization ID is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    fullName: z.string().optional(),
    email: z.string().optional(),
    phoneNumber: z.string().optional(),
    role: z.string().optional(),
    qualification: z.string().optional(),
    password: z.string().optional(),
    isPasswordReset: z.boolean().optional(),
    specializationId: z.string().optional(),
  }),
});

export const DoctorValidation = {
  create,
  update,
};
