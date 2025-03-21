'use client';
import type { rolesTable } from '@/models/roles';
import type { InferSelectModel } from 'drizzle-orm';
import { AITextInput } from '@/components/ai-text-input';
import { AITextarea } from '@/components/ai-textarea';
import { ActionIcon, Alert, Badge, Box, Button, Card, Container, Divider, Group, Modal, Table, Text, TextInput, Title, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AlertCircle, Edit, Plus, Search, Trash, X } from 'lucide-react';

import { useEffect, useState } from 'react';

type RolesManagerProps = {
  roles: InferSelectModel<typeof rolesTable>[];
};

export function RolesManager({ roles }: RolesManagerProps) {
  // State for roles
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRoles, setFilteredRoles] = useState(roles);

  // State for form
  const [isEditing, setIsEditing] = useState(false);
  const [currentRole, setCurrentRole] = useState<InferSelectModel<typeof rolesTable> | null>(null);
  const [roleName, setRoleName] = useState('');
  const [roleDescription, setRoleDescription] = useState('');

  // Modal state
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false);
  const [roleToDelete, setRoleToDelete] = useState<InferSelectModel<typeof rolesTable> | null>(null);

  // Alert state
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Filter roles when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRoles(roles);
    } else {
      const lowercaseQuery = searchQuery.toLowerCase();
      setFilteredRoles(
        roles.filter(
          role =>
            role.name?.toLowerCase().includes(lowercaseQuery) || role.description?.toLowerCase().includes(lowercaseQuery),
        ),
      );
    }
  }, [searchQuery, roles]);

  // Reset form
  const resetForm = () => {
    setRoleName('');
    setRoleDescription('');
    setCurrentRole(null);
    setIsEditing(false);
  };

  // Open modal for adding new tag
  const handleAddNew = () => {
    resetForm();
    open();
  };

  // Open modal for editing tag
  const handleEdit = (role: InferSelectModel<typeof rolesTable>) => {
    setCurrentRole(role);
    setRoleName(role.name || '');
    setRoleDescription(role.description || '');
    setIsEditing(true);
    open();
  };

  // Open delete confirmation modal
  const handleDeleteClick = (role: InferSelectModel<typeof rolesTable>) => {
    setRoleToDelete(role);
    deleteModalHandlers.open();
  };

  // Delete tag
  const confirmDelete = () => {
    if (roleToDelete) {
      setAlert({ type: 'success', message: `Tag "${roleToDelete.name}" has been deleted.` });

      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);

      deleteModalHandlers.close();
      setRoleToDelete(null);
    }
  };

  // Save tag (create or update)
  const handleSave = () => {
    if (!roleName.trim()) {
      setAlert({ type: 'error', message: 'Role name is required.' });
      return;
    }

    if (isEditing && currentRole) {
      // Update existing tag
      const updatedRoles = roles.map(role =>
        role.id === currentRole.id ? { ...role, name: roleName, description: roleDescription } : role,
      );
      setAlert({ type: 'success', message: `Role "${roleName}" has been updated.` });
    } else {
      // Create new tag
      const newRole: InferSelectModel<typeof rolesTable> = {
        id: Date.now().toString(), // Simple ID generation
        name: roleName,
        description: roleDescription,
      };
      setAlert({ type: 'success', message: `Role "${roleName}" has been created.` });
    }

    // Clear alert after 3 seconds
    setTimeout(() => setAlert(null), 3000);

    resetForm();
    close();
  };

  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="xs">
        Roles Management
      </Title>
      <Text c="dimmed" mb="xl">
        Manage roles used to categorize artifacts in the system
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

        {filteredRoles.length === 0
          ? (
              <Text ta="center" py="xl" c="dimmed">
                No roles found.
                {' '}
                {searchQuery ? 'Try a different search term.' : 'Create your first role by clicking "Add New Role".'}
              </Text>
            )
          : (
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th>Typical Skills</Table.Th>
                    <Table.Th style={{ width: '120px', textAlign: 'center' }}>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {filteredRoles.map(role => (
                    <Table.Tr key={role.id}>
                      <Table.Td>
                        <Badge size="md" fullWidth>{role.name}</Badge>
                      </Table.Td>
                      <Table.Td>{role.description}</Table.Td>
                      <Table.Td>
                        {role.typicalSkills?.map(skill => (
                          <Badge key={skill} size="sm" mr="xs">
                            {skill}
                          </Badge>
                        ))}
                      </Table.Td>
                      <Table.Td>
                        <Group justify="center">
                          <Tooltip label="Edit">
                            <ActionIcon variant="subtle" color="blue" onClick={() => handleEdit(role)}>
                              <Edit size={16} />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label="Delete">
                            <ActionIcon variant="subtle" color="red" onClick={() => handleDeleteClick(role)}>
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

      {/* Add/Edit Role Modal */}
      <Modal opened={opened} onClose={close} title={isEditing ? 'Edit Role' : 'Add New Role'} centered>
        <Box p="md">
          <AITextInput
            label="Role Name"
            placeholder="Enter role name"
            value={roleName}
            onChange={setRoleName}
            required
            contextPrompt="You are helping a user create a name for a role that will be used to categorize development artifacts."
            generatePrompt="Generate a concise, descriptive name for a tag that will be used to categorize development artifacts. The name should be a single word or short phrase, like 'database', 'ui-design', 'documentation', etc."
            name="roleName"
          />

          <AITextarea
            label="Description"
            placeholder="Enter role description"
            value={roleDescription}
            onChange={setRoleDescription}
            minRows={3}
            contextPrompt="You are helping a user write a description for a role that will be used to categorize development artifacts."
            generatePrompt="Generate a brief description (1-2 sentences) for a role that will be used to categorize development artifacts. The description should explain what kind of artifacts would be tagged with this label."
            name="roleDescription"
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
            Are you sure you want to delete the role
            {' '}
            <Badge>{roleToDelete?.name}</Badge>
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
