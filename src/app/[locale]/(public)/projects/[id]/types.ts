import { z } from 'zod';

export const StartProjectSchema = z.object({
  projectId: z
    .number(),
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be at most 100 characters')
    .optional(),
});

export type StartProject = z.infer<typeof StartProjectSchema>;
