'use client';
import type { technologiesTable } from '@/models/technologies';
import type { InferSelectModel } from 'drizzle-orm';
import { AITextInput } from '@/components/ai-text-input';
import { ActionIcon, Alert, Badge, Box, Button, Card, Container, Divider, Group, Modal, Table, Text, TextInput, Title, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AlertCircle, Edit, Plus, Search, Trash, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type TechnologiesManagerProps = {
  technologies: InferSelectModel<typeof technologiesTable>[];
};

export function TechnologiesManager({ technologies }: TechnologiesManagerProps) {
  // State for tags
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTechnologies, setFilteredTechnologies] = useState(technologies);

  // State for form
  const [isEditing, setIsEditing] = useState(false);
  const [currentTechnology, setCurrentTechnology] = useState<InferSelectModel<typeof technologiesTable> | null>(null);
  const [technologyName, setTechnologyName] = useState('');
  // const [technologyDescription, setTechnologyDescription] = useState('');

  // Modal state
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false);
  const [technologyToDelete, setTechnologyToDelete] = useState<InferSelectModel<typeof technologiesTable> | null>(null);

  // Alert state
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Filter tags when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTechnologies(technologies);
    } else {
      const lowercaseQuery = searchQuery.toLowerCase();
      setFilteredTechnologies(
        technologies.filter(
          technology =>
            tag.name?.toLowerCase().includes(lowercaseQuery) || tag.description?.toLowerCase().includes(lowercaseQuery),
        ),
      );
    }
  }, [searchQuery, technologies]);

  // Reset form
  const resetForm = () => {
    setTechnologyName('');
    setCurrentTechnology(null);
    setIsEditing(false);
  };

  // Open modal for adding new tag
  const handleAddNew = () => {
    resetForm();
    open();
  };

  // Open modal for editing tag
  const handleEdit = (technology: InferSelectModel<typeof technologiesTable>) => {
    setCurrentTechnology(technology);
    setTechnologyName(technology.name || '');
    // setTagDescription(tag.description || '');
    setIsEditing(true);
    open();
  };

  // Open delete confirmation modal
  const handleDeleteClick = (technology: InferSelectModel<typeof technologiesTable>) => {
    setTechnologyToDelete(technology);
    deleteModalHandlers.open();
  };

  // Delete tag
  const confirmDelete = () => {
    if (technologyToDelete) {
      setAlert({ type: 'success', message: `Technology "${technologyToDelete.name}" has been deleted.` });

      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);

      deleteModalHandlers.close();
      setTechnologyToDelete(null);
    }
  };

  // Save tag (create or update)
  const handleSave = () => {
    if (!technologyName.trim()) {
      setAlert({ type: 'error', message: 'Technology name is required.' });
      return;
    }

    if (isEditing && currentTechnology) {
      // Update existing tag
      const updatedTechnologies = technologies.map(technology =>
        technology.id === currentTechnology.id ? { ...technology, name: technologyName } : technology,
      );
      setAlert({ type: 'success', message: `Technology "${technologyName}" has been updated.` });
    } else {
      // Create new tag
      const newTechnology: InferSelectModel<typeof technologiesTable> = {
        id: Date.now().toString(), // Simple ID generation
        name: technologyName,
        description: '',
      };
      setAlert({ type: 'success', message: `Technology "${technologyName}" has been created.` });
    }

    // Clear alert after 3 seconds
    setTimeout(() => setAlert(null), 3000);

    resetForm();
    close();
  };

  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="xs">
        Technologies Management
      </Title>
      <Text c="dimmed" mb="xl">
        Manage technologies used to categorize artifacts in the system
      </Text>

      {alert && (
        <Alert
          color={alert.type === 'success' ? 'green' : 'red'}
          title={alert.type === 'success' ? 'Success' : 'Error'}
          icon={<AlertCircle size={16} />}
          mb="md"
          withCloseButton
          onClose={() => setAlert(null)}
        >
          {alert.message}
        </Alert>
      )}

      <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
        <Group justify="space-between" mb="md">
          <Title order={3}>All Tags</Title>
          <Group>
            <TextInput
              placeholder="Search tags..."
              value={searchQuery}
              onChange={event => setSearchQuery(event.currentTarget.value)}
              rightSection={
                searchQuery
                  ? (
                      <ActionIcon onClick={() => setSearchQuery('')} variant="subtle">
                        <X size={16} />
                      </ActionIcon>
                    )
                  : (
                      <Search size={16} />
                    )
              }
            />
            <Button leftSection={<Plus size={16} />} onClick={handleAddNew}>
              Add New Tag
            </Button>
          </Group>
        </Group>

        <Divider mb="md" />

        {filteredTechnologies.length === 0
          ? (
              <Text ta="center" py="xl" c="dimmed">
                No technologies found.
                {' '}
                {searchQuery ? 'Try a different search term.' : 'Create your first technology by clicking "Add New Technology".'}
              </Text>
            )
          : (
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Name</Table.Th>
                    {/* <Table.Th>Description</Table.Th> */}
                    <Table.Th style={{ width: '120px', textAlign: 'center' }}>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {filteredTechnologies.map(technology => (
                    <Table.Tr key={technology.id}>
                      <Table.Td>
                        <Badge size="md" fullWidth>{technology.name}</Badge>
                      </Table.Td>
                      {/* <Table.Td>{technology.description}</Table.Td> */}
                      <Table.Td>
                        <Group justify="center">
                          <Tooltip label="Edit">
                            <ActionIcon variant="subtle" color="blue" onClick={() => handleEdit(technology)}>
                              <Edit size={16} />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label="Delete">
                            <ActionIcon variant="subtle" color="red" onClick={() => handleDeleteClick(technology)}>
                              <Trash size={16} />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            )}
      </Card>

      {/* Add/Edit Technology Modal */}
      <Modal opened={opened} onClose={close} title={isEditing ? 'Edit Technology' : 'Add New Technology'} centered>
        <Box p="md">
          <AITextInput
            label="Technology Name"
            placeholder="Enter technology name"
            value={technologyName}
            onChange={setTechnologyName}
            required
            contextPrompt="You are helping a user create a name for a technology that will be used to categorize development artifacts."
            generatePrompt="Generate a concise, descriptive name for a technology that will be used to categorize development artifacts. The name should be a single word or short phrase, like 'database', 'ui-design', 'documentation', etc."
            name="technologyName"
          />

          {/* <AITextarea
            label="Description"
            placeholder="Enter technology description"
            value={technologyDescription}
            onChange={setTechnologyDescription}
            minRows={3}
            contextPrompt="You are helping a user write a description for a technology that will be used to categorize development artifacts."
            generatePrompt="Generate a brief description (1-2 sentences) for a technology that will be used to categorize development artifacts. The description should explain what kind of artifacts would be tagged with this label."
            name="technologyDescription"
          /> */}

          <Group justify="flex-end" mt="xl">
            <Button variant="subtle" onClick={close}>
              Cancel
            </Button>
            <Button onClick={handleSave}>{isEditing ? 'Update' : 'Create'}</Button>
          </Group>
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal opened={deleteModalOpened} onClose={deleteModalHandlers.close} title="Confirm Deletion" centered>
        <Box p="md">
          <Text mb="md">
            Are you sure you want to delete the technology
            {' '}
            <Badge>{technologyToDelete?.name}</Badge>
            ? This action cannot be undone.
          </Text>
          <Group justify="flex-end" mt="xl">
            <Button variant="subtle" onClick={deleteModalHandlers.close}>
              Cancel
            </Button>
            <Button color="red" onClick={confirmDelete}>
              Delete
            </Button>
          </Group>
        </Box>
      </Modal>
    </Container>
  );
}
