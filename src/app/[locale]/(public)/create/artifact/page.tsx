'use client';

import { AITextInput } from '@/components/ai-text-input';
import { AITextarea } from '@/components/ai-textarea';
import { db } from '@/lib/db';
import { artifactsTable, artifactsToArtifactTagsTable, artifactTagsTable } from '@/models/artifacts';
import { artifactsToProjectsTable } from '@/models/Schema';
import { currentUser } from '@clerk/nextjs/server';
import { Avatar, Badge, Box, Button, Card, Center, Container, Group, Paper, Select, Stack, Stepper, Text, TextInput, Title, useCombobox } from '@mantine/core';
import { desc, eq } from 'drizzle-orm';
import { ArrowLeft, Plus, Upload, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useQuery } from 'react-query';

// Fetch artifacts from database
async function fetchArtifacts() {
  try {
    const artifacts = await db.query.artifactsTable.findMany({
      with: {
        category: true,
        projects: true,
      },
      orderBy: desc(artifactsTable.dateCreated),
      limit: 10,
    });

    return artifacts;
  } catch (error) {
    console.error('Error fetching artifacts:', error);
    return [];
  }
}

export default function CreateArtifactPage() {
  const router = useRouter();
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

  const { data: projects } = useGetProjectsQuery();
  const { data: licenses } = useGetLicensesQuery();
  const filteredProjects = projects?.filter(project => !selectedProjects.includes(project.id));

  // Replace mock queries with real database queries
  const { data: categories } = useQuery({
    queryKey: ['artifactCategories'],
    queryFn: async () => {
      const categories = await db.query.artifactCategoriesTable.findMany();
      return categories;
    },
  });

  const handleSubmit = async () => {
    try {
      // Insert the new artifact
      const [newArtifact] = await db.insert(artifactsTable).values({
        title,
        description,
        categoryId: selectedCategory, // Add this state
        authorId: currentUser.id, // Add user context
        versionNumber: '1.0.0', // Initial version
        versionType: 'original',
        isCurrent: true,
        status: 'published',
      }).returning();

      // Insert tags
      for (const tagName of tags) {
        // First find or create the tag
        let [tag] = await db.select()
          .from(artifactTagsTable)
          .where(eq(artifactTagsTable.name, tagName))
          .limit(1);

        if (!tag) {
          [tag] = await db.insert(artifactTagsTable)
            .values({ name: tagName })
            .returning();
        }

        // Link tag to artifact
        await db.insert(artifactsToArtifactTagsTable)
          .values({
            artifactId: newArtifact.id,
            artifactTagId: tag.id,
          });
      }

      // Link projects if any
      if (selectedProjects.length > 0) {
        await db.insert(artifactsToProjectsTable)
          .values(
            selectedProjects.map(projectId => ({
              artifactId: newArtifact.id,
              projectId,
            })),
          );
      }

      router.push(`/artifacts/${newArtifact.id}`);
    } catch (error) {
      console.error('Error creating artifact:', error);
      // Add error handling UI
    }
  };

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
              data={categories?.map(cat => ({
                value: cat.id.toString(),
                label: cat.name,
              })) || []}
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
            {/* Additional details form fields */}
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
        <Group justify="space-between" mt="xl">
          <Button variant="subtle" onClick={() => setStep(1)}>
            Back
          </Button>
          <Button onClick={handleSubmit}>
            Create Artifact
          </Button>
        </Group>
      )}
    </Container>
  );
}
