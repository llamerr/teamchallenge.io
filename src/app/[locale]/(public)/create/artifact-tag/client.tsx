'use client';

import type { z } from 'zod';
import { AITextInput } from '@/components/ai-text-input';
import { AITextarea } from '@/components/ai-textarea';
import { toFormData } from '@/libs/utils';
import { Button, Card, Container, Flex, Group, Loader, Stack, Text, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import isEqual from 'lodash.isequal';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useEffect, useRef } from 'react';
import { createArtifactTag } from './action';
import { CreateArtifactTagSchema } from './types';

const initialValues: Partial<z.infer<typeof CreateArtifactTagSchema>> = {
  name: '',
  description: '',
};

export default function CreateArtifactTagForm() {
  // local form state
  const form = useForm<Partial<z.infer<typeof CreateArtifactTagSchema>>>({
    mode: 'controlled',
    initialValues,
    validate: zodResolver(CreateArtifactTagSchema),
  });

  // remote form/api state
  const [formState, formAction, isPending] = useActionState(createArtifactTag, initialValues);
  const lastFormState = useRef(formState);

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
        <Button component={Link} href="/artifacts/artifact-tags" variant="subtle" leftSection={<ArrowLeft size={16} />}>
          Back to Artifact Tags
        </Button>
      </Group>

      <Title order={1} mb="xs">
        Add New Artifact Tag
      </Title>
      <Text c="dimmed" mb="xl">
        Share your project artifact tags with the community
      </Text>

      <form action={() => formAction(toFormData<z.infer<typeof CreateArtifactTagSchema>>(form.values))}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section withBorder inheritPadding py="md">
            <Title order={3}>Basic Information</Title>
            <Text size="sm" c="dimmed">
              Start by providing the basic information about your artifact
            </Text>
          </Card.Section>

          <Stack mt="md" gap="md">
            <AITextInput
              label="Name"
              placeholder="Enter a descriptive name for your artifact tag"
              value={form.values.name || ''}
              onChange={value => form.setFieldValue('name', value)}
              required
              contextPrompt="You are helping a user create a name for a project artifact tag. The name should be concise, descriptive, and professional."
              generatePrompt="Generate a name for a project artifact tag. It supposed to group similar artifacts into categories. Examples might include 'Frontend', 'Backend', 'Database', 'API', 'UI/UX', 'Documentation', 'Testing', 'Deployment', 'Security', 'Performance', 'Optimization', 'Mobile', 'Desktop', 'Web', etc. Make it specific and professional."
              name="name"
            />

            <AITextarea
              label="Description"
              placeholder="Provide a detailed description of your artifact tag"
              value={form.values.description || ''}
              onChange={value => form.setFieldValue('description', value)}
              minRows={4}
              required
              contextPrompt="You are helping a user write a description for a project artifact tag. The description should explain what the artifact tag is, its purpose, and its key features or components."
              generatePrompt={
                `${form.values.name ? `Current artifact tag name is: ${form.values.name}\n\n` : ''
                }Generate a detailed description for a project artifact tag. The description should explain what the artifact tag is, its purpose, and its key features or components. Make it informative and professional, around 2-3 sentences.`
              }
              name="description"
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
