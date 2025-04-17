'use client';

import type { projectsTable } from '@/models/projects';
import type { InferSelectModel } from 'drizzle-orm';
import type { z } from 'zod';
import { AITextInput } from '@/components/ai-text-input';
import { toFormData } from '@/libs/utils';
import { Button } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconFolders } from '@tabler/icons-react';
import isEqual from 'lodash.isequal';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useRef } from 'react';
import { startProject } from './action';
import { StartProjectSchema } from './types';

const initialValues: Partial<z.infer<typeof StartProjectSchema>> & { teamId?: number | undefined } = {
  name: '',
};

export default function StartProjectForm({ project }: { project: InferSelectModel<typeof projectsTable> }) {
  const router = useRouter();

  // local form state
  const form = useForm<Partial<z.infer<typeof StartProjectSchema>>>({
    mode: 'controlled',
    initialValues: {
      ...initialValues,
      projectId: project.id,
    },
    validate: zodResolver(StartProjectSchema),
  });

  // remote form/api state
  const [formState, formAction, isPending] = useActionState(startProject, initialValues);
  const lastFormState = useRef(formState);

  useEffect(() => {
    if (formState.teamId) {
      router.push(`/teams/${formState.teamId}`);
    }
  }, [formState, router]);

  // sync local state on form action
  useEffect(() => {
    if (!isEqual(form.values, formState) && !isEqual(lastFormState.current, formState)) {
      form.setValues(formState);
      lastFormState.current = formState;
    }
  }, [formState, form]);

  return (
    <form
      action={() => formAction(toFormData<z.infer<typeof StartProjectSchema>>(form.values))}
      className="flex flex-row gap-4"
    >
      <AITextInput
        name="name"
        placeholder="Enter your team name"
        value={form.values.name || ''}
        onChange={form.setFieldValue.bind(form, 'name')}
        required
        contextPrompt="You are a team name generator for software development projects. Generate creative and professional team names that reflect the project's theme and purpose."
        generatePrompt={`Generate a creative team name for a project called "${project?.title}". The team name should be professional, memorable, and reflect the project's theme. Provide only single team name as an answer without any formatting.`}
      />

      <Button
        type="submit"
        loading={isPending}
        leftSection={<IconFolders size={16} />}
      >
        Start Project
      </Button>
    </form>
  );
}
