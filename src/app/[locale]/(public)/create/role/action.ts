'use server';

import { db } from '@/libs/DB';
import { rolesTable } from '@/models/roles';
import { CreateRoleSchema } from './types';

export type CreateRoleActionState = {
  id?: number;
  name: string;
  description?: string;
  typicalSkills?: string[];
  errors?: {
    name?: string[];
    description?: string[];
  };
};

export async function createRole(
  _prevState: Partial<CreateRoleActionState>,
  form: FormData,
): Promise<Partial<CreateRoleActionState>> {
  console.log('form data', form);
  const name = form.get('name') as string;
  const description = form.get('description') as string;
  const typicalSkills = (form.getAll('typicalSkills') as string[]).map(skill => skill.trim());

  const validatedFields = CreateRoleSchema.safeParse({
    name,
    description,
    typicalSkills,
  });

  console.log('validatedFields', validatedFields);
  if (!validatedFields.success) {
    console.log('validation errors', validatedFields.error.flatten().fieldErrors);
    return {
      name,
      description,
      typicalSkills,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log('validatedFields', validatedFields);
  // process validated form inputs here
  const [role] = await db.insert(rolesTable).values({
    name,
    description,
    typicalSkills,
  }).returning();

  if (!role) {
    return {
      name,
      description,
      typicalSkills,
      errors: {
        name: ['Failed to create role'],
      },
    };
  }

  return {
    id: role.id,
    name,
    description,
    typicalSkills,
  };
}
