import { z } from 'zod';

export const CreateArtifactTagSchema = z.object({
  id: z
    .number()
    .optional(),
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(50, { message: 'Name must be less than 50 characters' }),
  description: z
    .string()
    .optional(),
});

export type CreateArtifactTag = z.infer<typeof CreateArtifactTagSchema>;
