import { z } from 'zod';

export const CreateArtifactCategorySchema = z.object({
  id: z
    .number()
    .optional(),
  slug: z
    .string()
    .min(1, { message: 'Slug is required' })
    .max(50, { message: 'Slug must be less than 50 characters' }),
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(50, { message: 'Name must be less than 50 characters' }),
  description: z
    .string()
    .optional(),
  icon: z
    .string()
    .optional(),
});

export type CreateArtifactCategory = z.infer<typeof CreateArtifactCategorySchema>;
