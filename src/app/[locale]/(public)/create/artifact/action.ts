'use server';

import { db } from '@/libs/DB';
import { artifactsTable, artifactsToArtifactTagsTable } from '@/models/artifacts';
import { artifactsToProjectsTable } from '@/models/Schema';
import { CreateArtifactSchema } from './types';

export type CreateArtifactActionState = {
  authorId: number;
  title: string;
  description: string;
  categoryId: number;
  artifactTagsIds?: number[];
  version?: string;
  license?: string;
  projectsIds?: number[];
  errors?: {
    authorId?: string[];
    title?: string[];
    description?: string[];
    categoryId?: string[];
    artifactTagsIds?: string[];
    version?: string[];
    license?: string[];
    projectsIds?: string[];
  };
};

export async function createArtifact(
  _prevState: Partial<CreateArtifactActionState>,
  form: FormData,
): Promise<Partial<CreateArtifactActionState>> {
  console.log('form data', form);
  const authorId = Number(form.get('authorId'));
  const title = form.get('title') as string;
  const description = form.get('description') as string;
  const categoryId = Number(form.get('categoryId'));
  const artifactTagsIds = form.getAll('artifactTagsIds').map(Number) as number[];
  const version = form.get('version') as string;
  const license = form.get('license') as string;
  const projectsIds = form.getAll('projectsIds').map(Number) as number[];

  console.log('artifactTagsIds', artifactTagsIds);

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
  await db.transaction(async (tx) => {
    const [artifact] = await tx.insert(artifactsTable).values({
      title,
      description,
      categoryId: Number(categoryId),
      authorId: Number(authorId),
      license,
      versionNumber: version,
      versionType: 'original',
      isCurrent: true,
      status: 'published',
    }).returning();

    if (!artifact) {
      tx.rollback();
      return;
    }

    for (const artifactTagId of artifactTagsIds) {
      await tx.insert(artifactsToArtifactTagsTable).values({
        artifactId: artifact.id,
        artifactTagId,
      });
    }

    for (const projectId of projectsIds) {
      await tx.insert(artifactsToProjectsTable).values({
        artifactId: artifact.id,
        projectId,
      });
    }
  });

  return {
    authorId,
    title,
    description,
    categoryId,
    artifactTagsIds,
    version,
    license,
    projectsIds,
  };
}
