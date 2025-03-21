'use client';

import type { z } from 'zod';
import { AITextInput } from '@/components/ai-text-input';
import { toFormData } from '@/libs/utils';
import { Button, Card, Container, Flex, Group, Loader, Stack, Text, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import isEqual from 'lodash.isequal';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useRef } from 'react';
import { createTechnology } from './action';
import { CreateTechnologySchema } from './types';

const initialValues: Partial<z.infer<typeof CreateTechnologySchema>> = {
  name: '',
};

export default function CreateTechnologyForm() {
  const router = useRouter();

  // local form state
  const form = useForm<Partial<z.infer<typeof CreateTechnologySchema>>>({
    mode: 'controlled',
    initialValues,
    validate: zodResolver(CreateTechnologySchema),
  });

  // remote form/api state
  const [formState, formAction, isPending] = useActionState(createTechnology, initialValues);
  const lastFormState = useRef(formState);

  useEffect(() => {
    if (formState.id) {
      router.push('/admin/technologies');
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
        <Button component={Link} href="/admin/technologies" variant="subtle" leftSection={<ArrowLeft size={16} />}>
          Back to Technologies
        </Button>
      </Group>

      <Title order={1} mb="xs">
        Add New Technology
      </Title>
      <Text c="dimmed" mb="xl">
        Share your project technologies with the community
      </Text>

      <form action={() => formAction(toFormData<z.infer<typeof CreateTechnologySchema>>(form.values))}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section withBorder inheritPadding py="md">
            <Title order={3}>Basic Information</Title>
            <Text size="sm" c="dimmed">
              Start by providing the basic information about your technology
            </Text>
          </Card.Section>

          <Stack mt="md" gap="md">
            <AITextInput
              label="Name"
              placeholder="Enter a descriptive name for your technology"
              value={form.values.name || ''}
              onChange={value => form.setFieldValue('name', value)}
              required
              contextPrompt="You are helping a user create a name for a project technology. The name should be concise, descriptive, and professional."
              generatePrompt="Generate a name for a project technology. It supposed to group similar technologies into categories. Examples might include 'Frontend', 'Backend', 'Database', 'API', 'UI/UX', 'Documentation', 'Testing', 'Deployment', 'Security', 'Performance', 'Optimization', 'Mobile', 'Desktop', 'Web', etc. Make it specific and professional."
              name="name"
            />
          </Stack>
        </Card>

        <Group justify="space-between" mt="xl">
          <Flex gap="md">
            <Button variant="outline" type="submit" name="action" value="draft">
              Save as Draft
            </Button>
            <Button type="submit" name="action" value="publish" disabled={isPending}>
              Publish Technology
              {isPending && <Loader ml="md" size={16} />}
            </Button>
          </Flex>
        </Group>
      </form>
    </Container>
  );
}
