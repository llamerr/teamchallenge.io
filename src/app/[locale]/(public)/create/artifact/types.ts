import { z } from 'zod';

export const CreateArtifactSchema = z.object({
  authorId: z
    .number(),
  title: z
    .string()
    .min(3, { message: 'Be at least 3 characters long' })
    .trim(),
  description: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .trim(),
  categoryId: z
    .number(),
  artifactTagsIds: z
    .array(z
      .number(),
    )
    .min(1, { message: 'At least one tag is required' }),
  version: z
    .string()
    .min(3, { message: 'Be at least 3 characters long' })
    .trim()
    .optional(),
  license: z
    .string()
    .min(3, { message: 'Be at least 3 characters long' })
    .trim()
    .optional(),
  projectsIds: z
    .array(z
      .number(),
    ),
});
