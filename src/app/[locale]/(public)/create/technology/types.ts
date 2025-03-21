import { z } from 'zod';

export const CreateTechnologySchema = z.object({
  id: z
    .number()
    .optional(),
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(50, { message: 'Name must be less than 50 characters' }),
});

export type CreateTechnology = z.infer<typeof CreateTechnologySchema>;
