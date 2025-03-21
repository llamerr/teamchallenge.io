'use client';
import type { artifactCategoriesTable } from '@/models/artifacts';
import type { InferSelectModel } from 'drizzle-orm';
import { AITextInput } from '@/components/ai-text-input';
import { AITextarea } from '@/components/ai-textarea';
import { ActionIcon, Alert, Badge, Box, Button, Card, Container, Divider, Group, Modal, Table, Text, TextInput, Title, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AlertCircle, Edit, Plus, Search, Trash, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type CategoriesManagerProps = {
  categories: InferSelectModel<typeof artifactCategoriesTable>[];
};

export function CategoriesManager({ categories }: CategoriesManagerProps) {
  // State for categories
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);

  // State for form
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<InferSelectModel<typeof artifactCategoriesTable> | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');

  // Modal state
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false);
  const [categoryToDelete, setCategoryToDelete] = useState<InferSelectModel<typeof artifactCategoriesTable> | null>(null);

  // Alert state
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Filter categories when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCategories(categories);
    } else {
      const lowercaseQuery = searchQuery.toLowerCase();
      setFilteredCategories(
        categories.filter(
          category =>
            category.name?.toLowerCase().includes(lowercaseQuery) || category.description?.toLowerCase().includes(lowercaseQuery),
        ),
      );
    }
  }, [searchQuery, categories]);

  // Reset form
  const resetForm = () => {
    setCategoryName('');
    setCategoryDescription('');
    setCurrentCategory(null);
    setIsEditing(false);
  };

  // Open modal for adding new tag
  const handleAddNew = () => {
    resetForm();
    open();
  };

  // Open modal for editing tag
  const handleEdit = (category: InferSelectModel<typeof artifactCategoriesTable>) => {
    setCurrentCategory(category);
    setCategoryName(category.name || '');
    setCategoryDescription(category.description || '');
    setIsEditing(true);
    open();
  };

  // Open delete confirmation modal
  const handleDeleteClick = (category: InferSelectModel<typeof artifactCategoriesTable>) => {
    setCategoryToDelete(category);
    deleteModalHandlers.open();
  };

  // Delete category
  const confirmDelete = () => {
    if (categoryToDelete) {
      setAlert({ type: 'success', message: `Category "${categoryToDelete.name}" has been deleted.` });

      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);

      deleteModalHandlers.close();
      setCategoryToDelete(null);
    }
  };

  // Save tag (create or update)
  const handleSave = () => {
    if (!categoryName.trim()) {
      setAlert({ type: 'error', message: 'Category name is required.' });
      return;
    }

    if (isEditing && currentCategory) {
      // Update existing category
      const updatedCategories = categories.map(category =>
        category.id === currentCategory.id ? { ...category, name: categoryName, description: categoryDescription } : category,
      );
      setAlert({ type: 'success', message: `Category "${categoryName}" has been updated.` });
    } else {
      // Create new category
      const newCategory: InferSelectModel<typeof artifactCategoriesTable> = {
        id: Date.now().toString(), // Simple ID generation
        name: categoryName,
        description: categoryDescription,
      };
      setAlert({ type: 'success', message: `Category "${categoryName}" has been created.` });
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

        {filteredCategories.length === 0
          ? (
              <Text ta="center" py="xl" c="dimmed">
                No categories found.
                {' '}
                {searchQuery ? 'Try a different search term.' : 'Create your first category by clicking "Add New Category".'}
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
                  {filteredCategories.map(category => (
                    <Table.Tr key={category.id}>
                      <Table.Td>
                        <Badge size="md" fullWidth>{category.name}</Badge>
                      </Table.Td>
                      <Table.Td>{category.description}</Table.Td>
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
      <Modal opened={opened} onClose={close} title={isEditing ? 'Edit Category' : 'Add New Category'} centered>
        <Box p="md">
          <AITextInput
            label="Category Name"
            placeholder="Enter category name"
            value={categoryName}
            onChange={setCategoryName}
            required
            contextPrompt="You are helping a user create a name for a category that will be used to categorize development artifacts."
            generatePrompt="Generate a concise, descriptive name for a category that will be used to categorize development artifacts. The name should be a single word or short phrase, like 'database', 'ui-design', 'documentation', etc."
            name="categoryName"
          />

          <AITextarea
            label="Description"
            placeholder="Enter category description"
            value={categoryDescription}
            onChange={setCategoryDescription}
            minRows={3}
            contextPrompt="You are helping a user write a description for a category that will be used to categorize development artifacts."
            generatePrompt="Generate a brief description (1-2 sentences) for a category that will be used to categorize development artifacts. The description should explain what kind of artifacts would be categorized with this label."
            name="categoryDescription"
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
            Are you sure you want to delete the category
            {' '}
            <Badge>{categoryToDelete?.name}</Badge>
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
