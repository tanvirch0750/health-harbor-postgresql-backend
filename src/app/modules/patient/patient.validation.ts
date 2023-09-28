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
    medicalProfile: z.object(
      {
        profilePicture: z.string().optional(),
        address: z.string({
          required_error: 'Address is required',
        }),
        dob: z.string({
          required_error: 'Date of birth is required',
        }),
        gender: z.string({
          required_error: 'Gender is required',
        }),
        medicalHistory: z.string().optional(),
        emergencyContact: z.string({
          required_error: 'Gender is required',
        }),
        profileStatus: z.string().optional(),
      },
      {
        required_error: 'Medical Profile is required',
      }
    ),
  }),
});

const update = z.object({
  body: z.object({
    fullName: z.string().optional(),
    email: z.string().optional(),
    phoneNumber: z.string().optional(),
    role: z.string().optional(),
    password: z.string().optional(),
  }),
});

export const PatientValidation = {
  create,
  update,
};
