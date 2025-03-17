'use client';

import type { projectsTable } from '@/models/projects';
import type { artifactCategoriesTable } from '@/models/Schema';
import type { InferSelectModel } from 'drizzle-orm';
import { AITextInput } from '@/components/ai-text-input';
import { AITextarea } from '@/components/ai-textarea';
import { TagsInput } from '@/components/TagsInput';
import { Avatar, Box, Button, Card, Center, Checkbox, Combobox, Container, Divider, Flex, Group, InputBase, Loader, Paper, Radio, Select, Stack, Stepper, Switch, Text, TextInput, Title, useCombobox } from '@mantine/core';
import { ArrowLeft, Check, Plus, Upload } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useEffect, useState } from 'react';
import { createArtifact } from './action';

// Predefined tags for artifacts
const artifactTags = [
  'frontend',
  'backend',
  'database',
  'api',
  'ui/ux',
  'documentation',
  'testing',
  'deployment',
  'security',
  'performance',
  'optimization',
  'mobile',
  'desktop',
  'web',
];

type CreateArtifactFormProps = {
  projects: InferSelectModel<typeof projectsTable>[];
  licenses: { value: string; label: string }[];
  categories: InferSelectModel<typeof artifactCategoriesTable>[];
};

export default function CreateArtifactForm({ projects, licenses, categories }: CreateArtifactFormProps) {
  const [step, setStep] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(true);
  const [visibilityValue, setVisibilityValue] = useState('anyone');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [version, setVersion] = useState('');
  const [license, setLicense] = useState('');

  // Combobox for project search
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const handleProjectToggle = (projectId: string) => {
    setSelectedProjects(prev =>
      prev.includes(projectId) ? prev.filter(id => id !== projectId) : [...prev, projectId],
    );
  };

  const filteredProjects = projects.filter(project => !selectedProjects.includes(project.id.toString()));

  const [state, formAction, isPending] = useActionState(createArtifact, {
    // TODO: current user id from auth
    authorId: '1',
    title: '',
    description: '',
    categoryId: '',
    artifactTagsIds: [],
    version: '',
    license: '',
    projectsIds: [],
  });

  useEffect(() => {
    console.log('form state title changed', state.title);
    if (state.title) {
      setTitle(state.title);
    }
  }, [state.title]);

  useEffect(() => {
    console.log('form state description changed', state.description);
    if (state.description) {
      setDescription(state.description);
    }
  }, [state.description]);

  return (
    <Container size="md" py="xl">
      <Group mb="lg">
        <Button component={Link} href="/artifacts" variant="subtle" leftSection={<ArrowLeft size={16} />}>
          Back to Artifacts
        </Button>
      </Group>

      <Title order={1} mb="xs">
        Add New Artifact
      </Title>
      <Text c="dimmed" mb="xl">
        Share your project artifacts with the community
      </Text>

      <Stepper active={step} onStepClick={setStep} mb="xl">
        <Stepper.Step label="Basic Info" description="Artifact details">
          <Text size="sm" c="dimmed" ta="center" mb="md">
            Step 1 of 3: Start by providing the basic information about your artifact
          </Text>
        </Stepper.Step>
        <Stepper.Step label="Details" description="Additional information">
          <Text size="sm" c="dimmed" ta="center" mb="md">
            Step 2 of 3: Provide more information about your artifact
          </Text>
        </Stepper.Step>
        <Stepper.Step label="Projects" description="Link to projects">
          <Text size="sm" c="dimmed" ta="center" mb="md">
            Step 3 of 3: Select the projects that will use this artifact
          </Text>
        </Stepper.Step>
      </Stepper>

      <form action={formAction}>
        {step === 0 && (
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section withBorder inheritPadding py="md">
              <Title order={3}>Basic Information</Title>
              <Text size="sm" c="dimmed">
                Start by providing the basic information about your artifact
              </Text>
            </Card.Section>

            <Stack mt="md" gap="md">
              <AITextInput
                label="Title"
                placeholder="Enter a descriptive title for your artifact"
                value={title}
                onChange={setTitle}
                required
                contextPrompt="You are helping a user create a title for a project artifact. The title should be concise, descriptive, and professional."
                generatePrompt="Generate a title for a project artifact. Examples might include 'E-commerce Database Schema', 'Task Manager UI Design', 'Social Media App Architecture', etc. Make it specific and professional."
                name="title"
              />

              <AITextarea
                label="Description"
                placeholder="Provide a detailed description of your artifact"
                value={description}
                onChange={setDescription}
                minRows={4}
                required
                contextPrompt="You are helping a user write a description for a project artifact. The description should explain what the artifact is, its purpose, and its key features or components."
                generatePrompt={
                  `${title ? `Current artifact title is: ${title}\n\n` : ''
                  }Generate a detailed description for a project artifact. The description should explain what the artifact is, its purpose, and its key features or components. Make it informative and professional, around 2-3 sentences.`
                }
                name="description"
              />

              <Select
                label="Category"
                placeholder="Select category"
                data={categories.map(category => ({
                  value: category.id.toString(),
                  label: category.name || '',
                }))}
                required
                value={categoryId}
                onChange={(_value, option) => setCategoryId(option)}
                name="categoryId"
              />

              <Box>
                <Text fw={500} size="sm" mb="xs">
                  Tags
                </Text>
                <TagsInput
                  value={tags}
                  onChange={setTags}
                  placeholder="Add tags..."
                  predefinedTags={artifactTags}
                />
              </Box>

              <Box>
                <Text fw={500} size="sm" mb="xs">
                  File Upload
                </Text>
                <Paper
                  withBorder
                  p="xl"
                  ta="center"
                  style={{
                    borderStyle: 'dashed',
                    cursor: 'pointer',
                  }}
                >
                  <Center mb="md">
                    <Avatar radius="xl" size="lg" color="blue">
                      <Upload size={24} />
                    </Avatar>
                  </Center>
                  <Text fw={500} size="sm">
                    Click to upload or drag and drop
                  </Text>
                  <Text size="xs" c="dimmed">
                    Support for common file formats up to 50MB
                  </Text>
                </Paper>
              </Box>
            </Stack>

            <Group justify="space-between" mt="xl">
              <Button component={Link} href="/artifacts" variant="subtle">
                Cancel
              </Button>
              <Button type="button" onClick={() => setStep(1)}>Continue</Button>
            </Group>
          </Card>
        )}

        {step === 1 && (
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section withBorder inheritPadding py="md">
              <Title order={3}>Additional Details</Title>
              <Text size="sm" c="dimmed">
                Provide more information about your artifact
              </Text>
            </Card.Section>

            <Stack mt="md" gap="md">
              <TextInput
                label="Version"
                placeholder="e.g., 1.0.0"
                value={version}
                onChange={e => setVersion(e.target.value)}
                name="version"
              />

              <Select
                label="License"
                placeholder="Choose a license"
                data={licenses.map(license => ({ value: license.value, label: license.label }))}
                value={license}
                onChange={setLicense}
                name="license"
              />

              <Divider my="md" />

              <Group justify="space-between">
                <Box>
                  <Text fw={500} size="sm">
                    Visibility
                  </Text>
                  <Text size="xs" c="dimmed">
                    Choose who can see your artifact
                  </Text>
                </Box>
                <Switch
                  checked={isPublic}
                  onChange={event => setIsPublic(event.currentTarget.checked)}
                  label={isPublic ? 'Public' : 'Private'}
                  labelPosition="left"
                />
              </Group>

              <Radio.Group value={visibilityValue} onChange={setVisibilityValue}>
                <Stack mt="xs">
                  <Radio
                    value="anyone"
                    label={(
                      <Box>
                        <Text size="sm">Anyone with the link</Text>
                        <Text size="xs" c="dimmed">
                          Anyone with the link can view and download this artifact
                        </Text>
                      </Box>
                    )}
                  />
                  <Radio
                    value="restricted"
                    label={(
                      <Box>
                        <Text size="sm">Restricted access</Text>
                        <Text size="xs" c="dimmed">
                          Only project members can view and download this artifact
                        </Text>
                      </Box>
                    )}
                  />
                </Stack>
              </Radio.Group>
            </Stack>

            <Group justify="space-between" mt="xl">
              <Button variant="subtle" type="button" onClick={() => setStep(0)}>
                Back
              </Button>
              <Button type="button" onClick={() => setStep(2)}>Continue</Button>
            </Group>
          </Card>
        )}

        {step === 2 && (
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section withBorder inheritPadding py="md">
              <Title order={3}>Link to Projects</Title>
              <Text size="sm" c="dimmed">
                Select the projects that will use this artifact
              </Text>
            </Card.Section>

            <Stack mt="md" gap="md">
              <Stack gap="xs">
                {projects.map(project => (
                  <Checkbox
                    key={project.id}
                    label={project.title}
                    checked={selectedProjects.includes(project.id.toString())}
                    onChange={() => handleProjectToggle(project.id.toString())}
                  />
                ))}
              </Stack>

              <Box>
                <Text fw={500} size="sm" mb="xs">
                  Search Projects
                </Text>
                <Combobox
                  store={combobox}
                  onOptionSubmit={(val) => {
                    handleProjectToggle(val);
                    combobox.closeDropdown();
                  }}
                >
                  <Combobox.Target>
                    <InputBase
                      component="button"
                      type="button"
                      pointer
                      rightSection={<Combobox.Chevron />}
                      onClick={() => combobox.toggleDropdown()}
                      rightSectionPointerEvents="none"
                      multiline
                    >
                      <Group gap="xs">
                        <Text size="sm">Search for more projects...</Text>
                        <Plus size={16} />
                      </Group>
                    </InputBase>
                  </Combobox.Target>

                  <Combobox.Dropdown>
                    <Combobox.Search placeholder="Search projects..." />
                    <Combobox.Options>
                      {filteredProjects.length > 0
                        ? (
                            filteredProjects.map(project => (
                              <Combobox.Option value={project.id.toString()} key={project.id}>
                                <Group gap="xs">
                                  {selectedProjects.includes(project.id.toString()) && <Check size={16} />}
                                  <span>{project.title}</span>
                                </Group>
                              </Combobox.Option>
                            ))
                          )
                        : (
                            <Combobox.Empty>No projects found</Combobox.Empty>
                          )}
                    </Combobox.Options>
                  </Combobox.Dropdown>
                </Combobox>
              </Box>
            </Stack>

            <Group justify="space-between" mt="xl">
              <Button variant="subtle" type="button" onClick={() => setStep(1)}>
                Back
              </Button>
              <Flex gap="md">
                <Button variant="outline" type="submit" name="action" value="draft">
                  Save as Draft
                </Button>
                <Button type="submit" name="action" value="publish" disabled={isPending}>
                  Publish Artifact
                  {isPending && <Loader ml="md" size={16} />}
                </Button>
              </Flex>
            </Group>
          </Card>
        )}
      </form>
    </Container>
  );
}
