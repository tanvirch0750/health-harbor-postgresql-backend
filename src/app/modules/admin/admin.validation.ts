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

    password: z.string({
      required_error: 'Password is required',
    }),
    isPasswordReset: z.boolean().optional(),
  }),
});

const update = z.object({
  body: z.object({
    fullName: z.string().optional(),
    email: z.string().optional(),
    phoneNumber: z.string().optional(),
    role: z.string().optional(),
    password: z.string().optional(),
    isPasswordReset: z.boolean().optional(),
  }),
});

export const AdminValidation = {
  create,
  update,
};
