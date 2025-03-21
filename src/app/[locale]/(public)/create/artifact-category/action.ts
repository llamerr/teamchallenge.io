'use server';

import { db } from '@/libs/DB';
import { artifactCategoriesTable } from '@/models/artifacts';
import { CreateArtifactCategorySchema } from './types';

export type CreateArtifactCategoryActionState = {
  id?: number;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  errors?: {
    slug?: string[];
    name?: string[];
    description?: string[];
    icon?: string[];
  };
};

export async function createArtifactCategory(
  _prevState: Partial<CreateArtifactCategoryActionState>,
  form: FormData,
): Promise<Partial<CreateArtifactCategoryActionState>> {
  console.log('form data', form);
  const slug = form.get('slug') as string;
  const name = form.get('name') as string;
  const description = form.get('description') as string;
  const icon = form.get('icon') as string;

  const validatedFields = CreateArtifactCategorySchema.safeParse({
    slug,
    name,
    description,
    icon,
  });

  console.log('validatedFields', validatedFields);
  if (!validatedFields.success) {
    console.log('validation errors', validatedFields.error.flatten().fieldErrors);
    return {
      slug,
      name,
      description,
      icon,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log('validatedFields', validatedFields);
  // process validated form inputs here
  const [artifactCategory] = await db.insert(artifactCategoriesTable).values({
    slug,
    name,
    description,
    icon,
  }).returning();

  if (!artifactCategory) {
    return {
      slug,
      name,
      description,
      icon,
      errors: {
        name: ['Failed to create artifact tag'],
      },
    };
  }

  return {
    id: artifactCategory.id,
    slug,
    name,
    description,
    icon,
  };
}
