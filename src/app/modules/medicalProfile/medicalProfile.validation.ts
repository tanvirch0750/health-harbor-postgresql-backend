import { z } from 'zod';

const update = z.object({
  body: z.object({
    profilePicture: z.string().optional(),
    address: z.string().optional(),
    dob: z.string().optional(),
    gender: z.string().optional(),
    medicalHistory: z.string().optional(),
    emergencyContact: z.string().optional(),
    profileStatus: z.string().optional(),
  }),
});

export const MedicalProfileValidation = {
  update,
};
