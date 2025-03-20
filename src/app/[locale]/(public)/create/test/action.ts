'use server';

import { CreateTestSchema } from './types';

export type CreateTestActionState = {
  title: string;
  errors?: {
    title?: string[];
  };
};

export async function createTest(
  _prevState: CreateTestActionState,
  form: FormData,
): Promise<CreateTestActionState> {
  console.log('form data', form);
  const title = form.get('title') as string;

  const validatedFields = CreateTestSchema.safeParse({
    title,
  });

  console.log('validatedFields', validatedFields);
  if (!validatedFields.success) {
    console.log('validation errors', validatedFields.error.flatten().fieldErrors);
    return {
      title,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log('validatedFields', validatedFields);

  return {
    title,
  };
}
