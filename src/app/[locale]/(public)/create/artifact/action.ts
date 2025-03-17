'use server';

import { db } from '@/libs/DB';
import { artifactsTable } from '@/models/artifacts';
import { z } from 'zod';

const CreateArtifactSchema = z.object({
  authorId: z
    .string()
    .min(3, { message: 'Be at least 3 characters long' })
    .trim(),
  title: z
    .string()
    .min(3, { message: 'Be at least 3 characters long' })
    .trim(),
  description: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .trim(),
  categoryId: z
    .string()
    .min(3, { message: 'Be at least 3 characters long' })
    .trim(),
  artifactTagsIds: z
    .array(z
      .string()
      .min(3, { message: 'Be at least 3 characters long' }),
    )
    .min(1, { message: 'At least one tag is required' }),
  version: z
    .string()
    .min(3, { message: 'Be at least 3 characters long' })
    .trim(),
  license: z
    .string()
    .min(3, { message: 'Be at least 3 characters long' })
    .trim(),
  projectsIds: z
    .array(z
      .string()
      .min(3, { message: 'Be at least 3 characters long' }),
    )
    .min(1, { message: 'At least one project is required' }),
});

export type CreateArtifactActionState = {
  authorId?: string;
  title?: string;
  description?: string;
  categoryId?: string;
  artifactTagsIds: string[];
  version?: string;
  license?: string;
  projectsIds: string[];
  errors?: {
    authorId?: string;
    title?: string;
    description?: string;
    categoryId?: string;
    artifactTagsIds?: string[];
    version?: string;
    license?: string;
    projectsIds?: string[];
  };
};

export async function createArtifact(
  _prevState: CreateArtifactActionState,
  form: FormData,
): Promise<CreateArtifactActionState> {
  console.log('form data', form);
  const authorId = form.get('authorId') as string;
  const title = form.get('title') as string;
  const description = form.get('description') as string;
  const categoryId = form.get('categoryId') as string;
  const artifactTagsIds = form.get('artifactTagsIds') as string[];
  const version = form.get('version') as string;
  const license = form.get('license') as string;
  const projectsIds = form.get('projectsIds') as string[];

  const validatedFields = CreateArtifactSchema.safeParse({
    authorId,
    title,
    description,
    categoryId,
    artifactTagsIds,
    version,
    license,
    projectsIds,
  });

  console.log('validatedFields', validatedFields);
  if (!validatedFields.success) {
    console.log('validation errors', validatedFields.error.flatten().fieldErrors);
    return {
      authorId,
      title,
      description,
      categoryId,
      artifactTagsIds,
      version,
      license,
      projectsIds,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log('validatedFields', validatedFields);
  // process validated form inputs here
  await db.insert(artifactsTable).values({
    title,
    description,
    categoryId: Number(categoryId),
    authorId: Number(authorId),
    license,
    versionNumber: version,
    versionType: 'original',
    isCurrent: true,
    status: 'published',
  });

  return {
    title,
    description,
    categoryId,
    authorId,
    license,
    versionNumber,
    versionType,
    isCurrent: Boolean(isCurrent),
    status,
  };
}
