'use client';

import type { projectsTable } from '@/models/projects';
import type { artifactCategoriesTable } from '@/models/Schema';
import type { InferSelectModel } from 'drizzle-orm';
import type { z } from 'zod';
import { AITextInput } from '@/components/ai-text-input';
import { Button, Container, Loader } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useActionState } from 'react';
import { createTest } from './action';
import { CreateTestSchema } from './types';

const toFormData = (values: z.infer<typeof CreateTestSchema>) => {
  console.log('toFormData');
  const formData = new FormData();

  for (const [key, value] of Object.entries(values)) {
    if (Array.isArray(value)) {
      console.log('thefuck');
      // Handle array values by appending each item with indexed keys
      value.forEach((item, index) => {
        formData.append(`${key}[${index}]`, item);
      });
    } else {
      // Handle non-array values
      formData.append(key, value as string | Blob);
    }
  }

  return formData;
};

const initialValues: z.infer<typeof CreateTestSchema> = {
  // TODO: current user id from auth
  title: '',
};

type CreateTestFormProps = {
  projects: InferSelectModel<typeof projectsTable>[];
  licenses: { value: string; label: string }[];
  categories: InferSelectModel<typeof artifactCategoriesTable>[];
};

export default function CreateTestForm({ projects, licenses, categories }: CreateTestFormProps) {
  // local form state
  const form = useForm<z.infer<typeof CreateTestSchema>>({
    mode: 'controlled',
    initialValues,
    validate: zodResolver(CreateTestSchema),
  });

  // remote form/api state
  const [formState, formAction, isPending] = useActionState(createTest, initialValues);

  return (
    <Container size="md" py="xl">
      <form action={() => {
        console.log('form values', form.values);
        formAction(toFormData(form.values));
      }}
      >
        <AITextInput
          label="Title"
          placeholder="Enter a descriptive title for your artifact"
          value={form.values.title}
          onChange={(value) => {
            console.log('title change', value);
            form.setFieldValue('title', value);
          }}
          required
          contextPrompt="You are helping a user create a title for a project artifact. The title should be concise, descriptive, and professional."
          generatePrompt="Generate a title for a project artifact. Examples might include 'E-commerce Database Schema', 'Task Manager UI Design', 'Social Media App Architecture', etc. Make it specific and professional."
          name="title"
        />

        <Button type="submit" name="action" value="publish" disabled={isPending}>
          Publish Test
          {isPending && <Loader ml="md" size={16} />}
        </Button>
      </form>
    </Container>
  );
}
