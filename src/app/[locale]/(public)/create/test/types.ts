import { z } from 'zod';

export const CreateTestSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Be at least 3 characters long' })
    .trim(),
});
