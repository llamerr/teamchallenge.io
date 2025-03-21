'use server';

import { db } from '@/libs/DB';
import { technologiesTable } from '@/models/technologies';
import { CreateTechnologySchema } from './types';

export type CreateTechnologyActionState = {
  id?: number;
  name: string;
  errors?: {
    name?: string[];
  };
};

export async function createTechnology(
  _prevState: Partial<CreateTechnologyActionState>,
  form: FormData,
): Promise<Partial<CreateTechnologyActionState>> {
  console.log('form data', form);
  const name = form.get('name') as string;

  const validatedFields = CreateTechnologySchema.safeParse({
    name,
  });

  console.log('validatedFields', validatedFields);
  if (!validatedFields.success) {
    console.log('validation errors', validatedFields.error.flatten().fieldErrors);
    return {
      name,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log('validatedFields', validatedFields);
  // process validated form inputs here
  const [technology] = await db.insert(technologiesTable).values({
    name,
  }).returning();

  if (!technology) {
    return {
      name,
      errors: {
        name: ['Failed to create technology'],
      },
    };
  }

  return {
    id: technology.id,
    name,
  };
}
