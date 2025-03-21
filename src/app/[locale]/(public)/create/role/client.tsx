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
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useRef } from 'react';
import { createRole } from './action';
import { CreateRoleSchema } from './types';

const initialValues: Partial<z.infer<typeof CreateRoleSchema>> = {
  name: '',
  description: '',
  typicalSkills: [],
};

export default function CreateRoleForm() {
  const router = useRouter();

  // local form state
  const form = useForm<Partial<z.infer<typeof CreateRoleSchema>>>({
    mode: 'controlled',
    initialValues,
    validate: zodResolver(CreateRoleSchema),
  });

  // remote form/api state
  const [formState, formAction, isPending] = useActionState(createRole, initialValues);
  const lastFormState = useRef(formState);

  useEffect(() => {
    if (formState.id) {
      router.push('/admin/roles');
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
        <Button component={Link} href="/admin/roles" variant="subtle" leftSection={<ArrowLeft size={16} />}>
          Back to Roles
        </Button>
      </Group>

      <Title order={1} mb="xs">
        Add New Role
      </Title>
      <Text c="dimmed" mb="xl">
        Share your project roles with the community
      </Text>

      <form action={() => formAction(toFormData<z.infer<typeof CreateRoleSchema>>(form.values))}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section withBorder inheritPadding py="md">
            <Title order={3}>Basic Information</Title>
            <Text size="sm" c="dimmed">
              Start by providing the basic information about your role
            </Text>
          </Card.Section>

          <Stack mt="md" gap="md">
            <AITextInput
              label="Name"
              placeholder="Enter a descriptive name for your role"
              value={form.values.name || ''}
              onChange={value => form.setFieldValue('name', value)}
              required
              contextPrompt="You are helping a user create a name for a project role. The name should be concise, descriptive, and professional."
              generatePrompt="Generate a name for a project role. It supposed to group similar roles into categories. Examples might include 'Frontend Developer', 'Backend Developer', 'Database Administrator', 'API Developer', 'UI/UX Designer', 'Documentation Writer', 'Testing Engineer', 'Deployment Engineer', 'Security Analyst', 'Performance Engineer', 'Optimization Engineer', 'Mobile Developer', 'Desktop Developer', 'Web Developer', etc. Make it specific and professional."
              name="name"
            />

            <AITextarea
              label="Description"
              placeholder="Provide a detailed description of your role"
              value={form.values.description || ''}
              onChange={value => form.setFieldValue('description', value)}
              minRows={4}
              required
              contextPrompt="You are helping a user write a description for a project role. The description should explain what the role is, its purpose, and its key features."
              generatePrompt={
                `${form.values.name ? `Current role name is: ${form.values.name}\n\n` : ''
                }Generate a detailed description for a project role. The description should explain what the role is, its purpose, and its key features. Make it informative and professional, around 2-3 sentences.`
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
              Publish Role
              {isPending && <Loader ml="md" size={16} />}
            </Button>
          </Flex>
        </Group>
      </form>
    </Container>
  );
}
