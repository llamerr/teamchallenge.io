'use client';
import type { artifactTagsTable } from '@/models/artifacts';
import type { InferSelectModel } from 'drizzle-orm';
import type { Tag } from 'storybook/internal/types';
import { AITextInput } from '@/components/ai-text-input';
import { AITextarea } from '@/components/ai-textarea';
import { ActionIcon, Alert, Badge, Box, Button, Card, Container, Divider, Group, Modal, Table, Text, TextInput, Title, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AlertCircle, Edit, Plus, Search, Trash, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type TagsManagerProps = {
  tags: InferSelectModel<typeof artifactTagsTable>[];
};

export function TagsManager({ tags }: TagsManagerProps) {
  // State for tags
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTags, setFilteredTags] = useState(tags);

  // State for form
  const [isEditing, setIsEditing] = useState(false);
  const [currentTag, setCurrentTag] = useState<InferSelectModel<typeof artifactTagsTable> | null>(null);
  const [tagName, setTagName] = useState('');
  const [tagDescription, setTagDescription] = useState('');

  // Modal state
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false);
  const [tagToDelete, setTagToDelete] = useState<InferSelectModel<typeof artifactTagsTable> | null>(null);

  // Alert state
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Filter tags when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTags(tags);
    } else {
      const lowercaseQuery = searchQuery.toLowerCase();
      setFilteredTags(
        tags.filter(
          tag =>
            tag.name?.toLowerCase().includes(lowercaseQuery) || tag.description?.toLowerCase().includes(lowercaseQuery),
        ),
      );
    }
  }, [searchQuery, tags]);

  // Reset form
  const resetForm = () => {
    setTagName('');
    setTagDescription('');
    setCurrentTag(null);
    setIsEditing(false);
  };

  // Open modal for adding new tag
  const handleAddNew = () => {
    resetForm();
    open();
  };

  // Open modal for editing tag
  const handleEdit = (tag: InferSelectModel<typeof artifactTagsTable>) => {
    setCurrentTag(tag);
    setTagName(tag.name || '');
    setTagDescription(tag.description || '');
    setIsEditing(true);
    open();
  };

  // Open delete confirmation modal
  const handleDeleteClick = (tag: InferSelectModel<typeof artifactTagsTable>) => {
    setTagToDelete(tag);
    deleteModalHandlers.open();
  };

  // Delete tag
  const confirmDelete = () => {
    if (tagToDelete) {
      setAlert({ type: 'success', message: `Tag "${tagToDelete.name}" has been deleted.` });

      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);

      deleteModalHandlers.close();
      setTagToDelete(null);
    }
  };

  // Save tag (create or update)
  const handleSave = () => {
    if (!tagName.trim()) {
      setAlert({ type: 'error', message: 'Tag name is required.' });
      return;
    }

    if (isEditing && currentTag) {
      // Update existing tag
      const updatedTags = tags.map(tag =>
        tag.id === currentTag.id ? { ...tag, name: tagName, description: tagDescription } : tag,
      );
      setAlert({ type: 'success', message: `Tag "${tagName}" has been updated.` });
    } else {
      // Create new tag
      const newTag: Tag = {
        id: Date.now().toString(), // Simple ID generation
        name: tagName,
        description: tagDescription,
      };
      setAlert({ type: 'success', message: `Tag "${tagName}" has been created.` });
    }

    // Clear alert after 3 seconds
    setTimeout(() => setAlert(null), 3000);

    resetForm();
    close();
  };

  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="xs">
        Artifact Tags Management
      </Title>
      <Text c="dimmed" mb="xl">
        Manage tags used to categorize artifacts in the system
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

        {filteredTags.length === 0
          ? (
              <Text ta="center" py="xl" c="dimmed">
                No tags found.
                {' '}
                {searchQuery ? 'Try a different search term.' : 'Create your first tag by clicking "Add New Tag".'}
              </Text>
            )
          : (
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th style={{ width: '120px', textAlign: 'center' }}>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {filteredTags.map(tag => (
                    <Table.Tr key={tag.id}>
                      <Table.Td>
                        <Badge size="md" fullWidth>{tag.name}</Badge>
                      </Table.Td>
                      <Table.Td>{tag.description}</Table.Td>
                      <Table.Td>
                        <Group justify="center">
                          <Tooltip label="Edit">
                            <ActionIcon variant="subtle" color="blue" onClick={() => handleEdit(tag)}>
                              <Edit size={16} />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label="Delete">
                            <ActionIcon variant="subtle" color="red" onClick={() => handleDeleteClick(tag)}>
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

      {/* Add/Edit Tag Modal */}
      <Modal opened={opened} onClose={close} title={isEditing ? 'Edit Tag' : 'Add New Tag'} centered>
        <Box p="md">
          <AITextInput
            label="Tag Name"
            placeholder="Enter tag name"
            value={tagName}
            onChange={setTagName}
            required
            contextPrompt="You are helping a user create a name for a tag that will be used to categorize development artifacts."
            generatePrompt="Generate a concise, descriptive name for a tag that will be used to categorize development artifacts. The name should be a single word or short phrase, like 'database', 'ui-design', 'documentation', etc."
            name="tagName"
          />

          <AITextarea
            label="Description"
            placeholder="Enter tag description"
            value={tagDescription}
            onChange={setTagDescription}
            minRows={3}
            contextPrompt="You are helping a user write a description for a tag that will be used to categorize development artifacts."
            generatePrompt="Generate a brief description (1-2 sentences) for a tag that will be used to categorize development artifacts. The description should explain what kind of artifacts would be tagged with this label."
            name="tagDescription"
          />

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
            Are you sure you want to delete the tag
            {' '}
            <Badge>{tagToDelete?.name}</Badge>
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
