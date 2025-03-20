'use server';

import { db } from '@/libs/DB';
import { artifactTagsTable } from '@/models/artifacts';
import { CreateArtifactTagSchema } from './types';

export type CreateArtifactTagActionState = {
  id?: number;
  name: string;
  description?: string;
  errors?: {
    name?: string[];
    description?: string[];
  };
};

export async function createArtifactTag(
  _prevState: Partial<CreateArtifactTagActionState>,
  form: FormData,
): Promise<Partial<CreateArtifactTagActionState>> {
  console.log('form data', form);
  const name = form.get('name') as string;
  const description = form.get('description') as string;

  const validatedFields = CreateArtifactTagSchema.safeParse({
    name,
    description,
  });

  console.log('validatedFields', validatedFields);
  if (!validatedFields.success) {
    console.log('validation errors', validatedFields.error.flatten().fieldErrors);
    return {
      name,
      description,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log('validatedFields', validatedFields);
  // process validated form inputs here
  const [artifactTag] = await db.insert(artifactTagsTable).values({
    name,
    description,
  }).returning();

  if (!artifactTag) {
    return {
      name,
      description,
      errors: {
        name: ['Failed to create artifact tag'],
      },
    };
  }

  return {
    id: artifactTag.id,
    name,
    description,
  };
}
