import { z } from 'zod';

export const CreateRoleSchema = z.object({
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
  typicalSkills: z
    .array(z
      .string()
      .max(50, { message: 'Skill must be less than 50 characters' }),
    ),
});

export type CreateRole = z.infer<typeof CreateRoleSchema>;
