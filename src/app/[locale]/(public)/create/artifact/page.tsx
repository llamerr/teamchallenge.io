'use client';

import { AITextInput } from '@/components/ai-text-input';
import { AITextarea } from '@/components/ai-textarea';
import { Avatar, Badge, Box, Button, Card, Center, Checkbox, Combobox, Container, Divider, Flex, Group, InputBase, Paper, Radio, Select, Stack, Stepper, Switch, Text, TextInput, Title, useCombobox } from '@mantine/core';
import { ArrowLeft, Check, Plus, Upload, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Mock data for projects
const projects = [
  { id: '1', title: 'E-commerce Platform' },
  { id: '2', title: 'Real-time Chat Application' },
  { id: '3', title: 'Task Management System' },
  { id: '4', title: 'Mobile Weather App' },
  { id: '5', title: 'Blog Platform' },
];

// License options
const licenses = [
  { value: 'mit', label: 'MIT License' },
  { value: 'apache', label: 'Apache License 2.0' },
  { value: 'gpl', label: 'GNU GPL v3' },
  { value: 'bsd', label: 'BSD License' },
  { value: 'cc0', label: 'Creative Commons Zero v1.0' },
];

export default function CreateArtifactPage() {
  const [step, setStep] = useState(0); // Mantine Stepper is 0-indexed
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(true);
  const [visibilityValue, setVisibilityValue] = useState('anyone');

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Combobox for project search
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleProjectToggle = (projectId: string) => {
    setSelectedProjects(prev =>
      prev.includes(projectId) ? prev.filter(id => id !== projectId) : [...prev, projectId],
    );
  };

  const filteredProjects = projects.filter(project => !selectedProjects.includes(project.id));

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
            />

            <Select
              label="Category"
              placeholder="Select category"
              data={[
                { value: 'design-doc', label: 'Design Document' },
                { value: 'ui-design', label: 'UI Design' },
                { value: 'database', label: 'Database Schema' },
                { value: 'presentation', label: 'Presentation' },
              ]}
              required
            />

            <Box>
              <Text fw={500} size="sm" mb="xs">
                Tags
              </Text>
              <Group gap="xs">
                <TextInput
                  placeholder="Add tags..."
                  value={tagInput}
                  onChange={event => setTagInput(event.currentTarget.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      handleAddTag();
                    }
                  }}
                  style={{ flex: 1 }}
                />
                <Button variant="default" onClick={handleAddTag}>
                  <Plus size={16} />
                </Button>
              </Group>

              {tags.length > 0 && (
                <Group mt="xs" gap="xs">
                  {tags.map(tag => (
                    <Badge
                      key={tag}
                      rightSection={(
                        <Box
                          component="button"
                          onClick={() => handleRemoveTag(tag)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <X size={14} />
                        </Box>
                      )}
                    >
                      {tag}
                    </Badge>
                  ))}
                </Group>
              )}
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
            <Button onClick={() => setStep(1)}>Continue</Button>
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
            <TextInput label="Version" placeholder="e.g., 1.0.0" />

            <Select
              label="License"
              placeholder="Choose a license"
              data={licenses.map(license => ({ value: license.value, label: license.label }))}
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
            <Button variant="subtle" onClick={() => setStep(0)}>
              Back
            </Button>
            <Button onClick={() => setStep(2)}>Continue</Button>
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
                  checked={selectedProjects.includes(project.id)}
                  onChange={() => handleProjectToggle(project.id)}
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
                            <Combobox.Option value={project.id} key={project.id}>
                              <Group gap="xs">
                                {selectedProjects.includes(project.id) && <Check size={16} />}
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
            <Button variant="subtle" onClick={() => setStep(1)}>
              Back
            </Button>
            <Flex gap="md">
              <Button variant="outline">Save as Draft</Button>
              <Button>Publish Artifact</Button>
            </Flex>
          </Group>
        </Card>
      )}
    </Container>
  );
}
