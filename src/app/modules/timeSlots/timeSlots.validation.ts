import { z } from 'zod';

const create = z.object({
  body: z.object({
    startTime: z.string({
      required_error: 'Start time is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    startTime: z.string().optional(),
  }),
});

export const TimeSlotsValidation = {
  create,
  update,
};
