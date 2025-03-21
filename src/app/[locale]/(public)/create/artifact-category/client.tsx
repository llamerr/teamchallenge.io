'use client';

import type { z } from 'zod';
import { AITextInput } from '@/components/ai-text-input';
import { AITextarea } from '@/components/ai-textarea';
import { toFormData } from '@/libs/utils';
import { Button, Card, Container, Flex, Group, Loader, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import isEqual from 'lodash.isequal';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useRef } from 'react';
import { createArtifactCategory } from './action';
import { CreateArtifactCategorySchema } from './types';

const initialValues: Partial<z.infer<typeof CreateArtifactCategorySchema>> = {
  slug: '',
  name: '',
  description: '',
  icon: '',
};

export default function CreateArtifactCategoryForm() {
  const router = useRouter();

  // local form state
  const form = useForm<Partial<z.infer<typeof CreateArtifactCategorySchema>>>({
    mode: 'controlled',
    initialValues,
    validate: zodResolver(CreateArtifactCategorySchema),
  });

  // remote form/api state
  const [formState, formAction, isPending] = useActionState(createArtifactCategory, initialValues);
  const lastFormState = useRef(formState);

  useEffect(() => {
    if (formState.id) {
      router.push('/admin/artifact-categories');
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
    <Container size="md" py="xl">
      <Group mb="lg">
        <Button component={Link} href="/admin/artifact-categories" variant="subtle" leftSection={<ArrowLeft size={16} />}>
          Back to Artifact Categories
        </Button>
      </Group>

      <Title order={1} mb="xs">
        Add New Artifact Category
      </Title>
      <Text c="dimmed" mb="xl">
        Share your project artifact categories with the community
      </Text>

      <form action={() => formAction(toFormData<z.infer<typeof CreateArtifactCategorySchema>>(form.values))}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section withBorder inheritPadding py="md">
            <Title order={3}>Basic Information</Title>
            <Text size="sm" c="dimmed">
              Start by providing the basic information about your artifact category
            </Text>
          </Card.Section>

          <Stack mt="md" gap="md">
            <Group justify="apart" gap="md" grow>
              <AITextInput
                label="Name"
                placeholder="Enter a descriptive name for your artifact category"
                value={form.values.name || ''}
                onChange={(value) => {
                  form.setFieldValue('name', value);
                  form.setFieldValue('slug', value.toLowerCase().trim().replace(/\s+/g, '-'));
                }}
                required
                contextPrompt="You are helping a user create a name for a project artifact category. The name should be concise, descriptive, and professional."
                generatePrompt="Generate a name for a project artifact category. It supposed to group similar artifacts into categories. Examples might include 'Design Document', 'Code', 'Documentation', 'Database Schema', etc. Make it specific and professional."
                name="name"
              />

              <TextInput
                label="Slug"
                placeholder="Enter a slug for your artifact tag"
                value={form.values.slug || ''}
                onChange={e => form.setFieldValue('slug', e.target.value)}
                required
                name="slug"
              />
            </Group>

            <AITextarea
              label="Description"
              placeholder="Provide a detailed description of your artifact tag"
              value={form.values.description || ''}
              onChange={value => form.setFieldValue('description', value)}
              minRows={4}
              required
              contextPrompt="You are helping a user write a description for a project artifact category. The description should explain what the artifact category is, its purpose, and its key features or components."
              generatePrompt={
                `${form.values.name ? `Current artifact category name is: ${form.values.name}\n\n` : ''
                }Generate a detailed description for a project artifact category. The description should explain what the artifact category is, its purpose, and its key features or components. Make it informative and professional, around 2-3 sentences.`
              }
              name="description"
            />

            <TextInput
              label="Icon"
              placeholder="Enter an icon for your artifact tag"
              value={form.values.icon || ''}
              onChange={e => form.setFieldValue('icon', e.target.value)}
              name="icon"
            />
          </Stack>
        </Card>

        <Group justify="space-between" mt="xl">
          <Flex gap="md">
            <Button variant="outline" type="submit" name="action" value="draft">
              Save as Draft
            </Button>
            <Button type="submit" name="action" value="publish" disabled={isPending}>
              Publish Artifact Tag
              {isPending && <Loader ml="md" size={16} />}
            </Button>
          </Flex>
        </Group>
      </form>
    </Container>
  );
}
