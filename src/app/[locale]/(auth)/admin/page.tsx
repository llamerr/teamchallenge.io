'use client';

import { Button, Card, Container, Group, SimpleGrid, Text, Title } from '@mantine/core';
import { FileText, Settings, Tags, Users } from 'lucide-react';
import Link from 'next/link';

function AdminDashboard() {
  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="xs">
        Admin Dashboard
      </Title>
      <Text c="dimmed" mb="xl">
        Manage your platform settings and content
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group>
            <div className="p-3 bg-blue-100 rounded-full">
              <Tags className="h-6 w-6 text-blue-600" />
            </div>
            <Title order={3}>Tags</Title>
          </Group>
          <Text mt="md" mb="xl">
            Manage artifact tags and categories used throughout the platform.
          </Text>
          <Button component={Link} href="/admin/tags" variant="light" fullWidth>
            Manage Tags
          </Button>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group>
            <div className="p-3 bg-green-100 rounded-full">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <Title order={3}>Artifacts</Title>
          </Group>
          <Text mt="md" mb="xl">
            Review and moderate artifacts submitted by users.
          </Text>
          <Button component={Link} href="/admin/artifacts" variant="light" fullWidth>
            Manage Artifacts
          </Button>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group>
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <Title order={3}>Users</Title>
          </Group>
          <Text mt="md" mb="xl">
            Manage user accounts, roles, and permissions.
          </Text>
          <Button component={Link} href="/admin/users" variant="light" fullWidth>
            Manage Users
          </Button>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group>
            <div className="p-3 bg-orange-100 rounded-full">
              <Settings className="h-6 w-6 text-orange-600" />
            </div>
            <Title order={3}>Settings</Title>
          </Group>
          <Text mt="md" mb="xl">
            Configure platform settings and preferences.
          </Text>
          <Button component={Link} href="/admin/settings" variant="light" fullWidth>
            Platform Settings
          </Button>
        </Card>
      </SimpleGrid>
    </Container>
  );
}

export default function AdminPage() {
  return (
    <AdminDashboard />
  );
}
