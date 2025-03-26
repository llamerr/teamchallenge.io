import { db } from '@/libs/DB';
import { usersToTechnologiesTable } from '@/models/Schema';
import { technologiesTable } from '@/models/technologies';
import { userProfilesTable, usersTable, userStatsTable } from '@/models/users';
import { ActionIcon, Avatar, Badge, Box, Button, Card, Container, Flex, Grid, GridCol, Group, Select, Stack, Tabs, TabsList, TabsPanel, TabsTab, Text, TextInput, Title } from '@mantine/core';
import { IconBriefcase, IconCode, IconFilter, IconMapPin, IconSearch, IconStar } from '@tabler/icons-react';
import { sql } from 'drizzle-orm';
import Link from 'next/link';

// Fetch users from database
async function fetchUsers({
  availabilityStatus = 'available',
  limit = 10,
}: {
  availabilityStatus: string;
  limit: number;
}) {
  try {
    const users = await db
      .select({
        id: usersTable.id,
        username: usersTable.username,
        email: usersTable.email,
        projectsCompleted: userStatsTable.projects_completed,
        teamsLed: userStatsTable.teams_led,
        artifactsCreated: userStatsTable.artifacts_created,
        contributions: userStatsTable.contributions,
        rating: userStatsTable.rating,
        title: userProfilesTable.title,
        avatarUrl: userProfilesTable.avatar_url,
        location: userProfilesTable.location,
        about: userProfilesTable.about,
        availabilityStatus: userProfilesTable.availability_status,
        availabilityDate: userProfilesTable.availability_date,
        technologyNames: sql<string[]>`ARRAY_AGG(${technologiesTable.name})`.as('technologyNames'), // Aggregate technology names
      })
      .from(usersTable)
      .leftJoin(userStatsTable, sql`${usersTable.id} = ${userStatsTable.user_id}`) // Joining user_stats
      .leftJoin(userProfilesTable, sql`${usersTable.id} = ${userProfilesTable.user_id}`) // Joining user_profiles
      .leftJoin(usersToTechnologiesTable, sql`${usersTable.id} = ${usersToTechnologiesTable.userId}`) // Joining users_to_technologies
      .leftJoin(technologiesTable, sql`${usersToTechnologiesTable.technologyId} = ${technologiesTable.id}`) // Joining technologies
      .where(sql`${userProfilesTable.availability_status} = ${availabilityStatus}`) // Adding where clause
      .groupBy(
        usersTable.id,
        usersTable.username,
        usersTable.email,
        userStatsTable.projects_completed,
        userStatsTable.teams_led,
        userStatsTable.artifacts_created,
        userStatsTable.contributions,
        userStatsTable.rating,
        userProfilesTable.title,
        userProfilesTable.avatar_url,
        userProfilesTable.location,
        userProfilesTable.about,
        userProfilesTable.availability_status,
        userProfilesTable.availability_date,
      )
      .limit(limit);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export default async function UsersPage() {
  const availableUsers = await fetchUsers({
    availabilityStatus: 'available',
    limit: 100,
  });

  const notAvailableUsers = await fetchUsers({
    availabilityStatus: 'not available',
    limit: 100,
  });

  const idleUsers = await fetchUsers({
    availabilityStatus: 'idle',
    limit: 100,
  });

  const users = [...availableUsers, ...notAvailableUsers, ...idleUsers];

  return (
    <Container size="xl" py="xl">
      <Flex justify="space-between" align="center" mb="xl">
        <Title order={1}>Community Members</Title>
        <Button component={Link} href="/create/team">
          Create Team
        </Button>
      </Flex>

      <Grid mb="xl">
        <GridCol span={{ base: 12, lg: 6 }}>
          <TextInput
            placeholder="Search users by name, skills, or location..."
            leftSection={<IconSearch size={16} />}
          />
        </GridCol>

        <GridCol span={{ base: 12, lg: 4 }}>
          <Group grow>
            <Select
              placeholder="Role"
              defaultValue="all"
              data={[
                { value: 'all', label: 'All Roles' },
                { value: 'frontend', label: 'Frontend Developer' },
                { value: 'backend', label: 'Backend Developer' },
                { value: 'fullstack', label: 'Full Stack Developer' },
                { value: 'designer', label: 'UI/UX Designer' },
                { value: 'devops', label: 'DevOps Engineer' },
                { value: 'pm', label: 'Project Manager' },
              ]}
            />

            <Select
              placeholder="Availability"
              defaultValue="all"
              data={[
                { value: 'all', label: 'All' },
                { value: 'available', label: 'Available Now' },
                { value: 'soon', label: 'Available Soon' },
                { value: 'unavailable', label: 'Not Available' },
              ]}
            />
          </Group>
        </GridCol>

        <GridCol span={{ base: 12, lg: 2 }}>
          <ActionIcon variant="light" size="lg">
            <IconFilter size={16} />
          </ActionIcon>
        </GridCol>
      </Grid>

      <Tabs defaultValue="grid" mb="xl">
        <Flex justify="space-between" align="center" mb="md">
          <Text c="dimmed">
            Showing
            {users.length}
            {' '}
            users
          </Text>
          <TabsList>
            <TabsTab value="grid">Grid</TabsTab>
            <TabsTab value="list">List</TabsTab>
          </TabsList>
        </Flex>

        <TabsPanel value="grid">
          <Grid>
            {users.map(user => (
              <GridCol key={user.id} span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
                <Card shadow="sm" padding="md" radius="md" withBorder>
                  <Box
                    w="100%"
                    h={4}
                    bg={user.availabilityStatus === 'available' ? 'blue' : 'gray.3'}
                    mb="md"
                    style={{ marginLeft: -16, marginRight: -16, marginTop: -16, width: 'calc(100% + 32px)' }}
                  />
                  <Flex direction="column" align="center" mb="md">
                    <Avatar src={user.avatarUrl} alt={user.username} size="xl" radius="xl" mb="md">
                      {user.username
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </Avatar>
                    <Stack gap={0} align="center">
                      <Text
                        component={Link}
                        href={`/users/${user.id}`}
                        size="lg"
                        fw={700}
                        style={{ textDecoration: 'none' }}
                      >
                        {user.username}
                      </Text>
                      <Text size="sm" c="dimmed">
                        {user.title}
                      </Text>
                      <Group gap="xs" mt="xs">
                        <IconMapPin size={14} style={{ color: 'var(--mantine-color-dimmed)' }} />
                        <Text size="xs" c="dimmed">
                          {user.location}
                        </Text>
                      </Group>
                    </Stack>

                    {user.availabilityStatus === 'available' && (
                      <Badge mt="sm" leftSection={<IconBriefcase size={14} />}>
                        Looking for Projects
                      </Badge>
                    )}
                  </Flex>

                  <Text size="sm" c="dimmed" lineClamp={2} mb="md">
                    {user.about}
                  </Text>

                  <Stack gap="md">
                    <Box>
                      <Text size="xs" c="dimmed" mb="xs">
                        Top Skills
                      </Text>
                      <Group gap="xs">
                        {user.technologyNames.map((tech, index) => (
                          <Badge key={index} variant="outline" size="xs">
                            {tech}
                          </Badge>
                        ))}
                      </Group>
                    </Box>

                    <Flex justify="space-between">
                      <Group gap="xs">
                        <IconCode size={16} style={{ color: 'var(--mantine-color-dimmed)' }} />
                        <Text size="sm">
                          {user.projectsCompleted}
                          {' '}
                          projects
                        </Text>
                      </Group>
                      <Group gap="xs">
                        <IconStar size={16} style={{ color: 'var(--mantine-color-yellow-5)' }} />
                        <Text size="sm">{user.rating}</Text>
                      </Group>
                    </Flex>
                  </Stack>

                  <Button component={Link} href={`/users/${user.id}`} variant="outline" fullWidth mt="md">
                    View Profile
                  </Button>
                </Card>
              </GridCol>
            ))}
          </Grid>
        </TabsPanel>

        <TabsPanel value="list">
          <Card padding={0} withBorder>
            <Box p="md" bg="gray.1" fw={500}>
              <Grid>
                <GridCol span={4}>User</GridCol>
                <GridCol span={2}>Role</GridCol>
                <GridCol span={2}>Skills</GridCol>
                <GridCol span={2}>Projects</GridCol>
                <GridCol span={2}>Status</GridCol>
              </Grid>
            </Box>

            {users.map((user, index) => (
              <Box key={user.id} p="md" bg={index % 2 === 0 ? 'white' : 'gray.0'}>
                <Grid align="center">
                  <GridCol span={4}>
                    <Group>
                      <Avatar src={user.avatarUrl} alt={user.username} radius="xl">
                        {user.username
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </Avatar>
                      <Stack gap={0}>
                        <Text component={Link} href={`/users/${user.id}`} fw={500} style={{ textDecoration: 'none' }}>
                          {user.username}
                        </Text>
                        <Group gap="xs">
                          <IconMapPin size={14} style={{ color: 'var(--mantine-color-dimmed)' }} />
                          <Text size="xs" c="dimmed">
                            {user.location}
                          </Text>
                        </Group>
                      </Stack>
                    </Group>
                  </GridCol>
                  <GridCol span={2}>
                    <Text size="sm">{user.title}</Text>
                  </GridCol>
                  <GridCol span={2}>
                    <Group gap="xs">
                      {user.technologyNames.slice(0, 2).map((tech, index) => (
                        <Badge key={index} variant="outline" size="xs">
                          {tech}
                        </Badge>
                      ))}
                      {user.technologyNames.length > 2 && (
                        <Badge variant="outline" size="xs">
                          +
                          {user.technologyNames.length - 2}
                        </Badge>
                      )}
                    </Group>
                  </GridCol>
                  <GridCol span={2}>
                    <Group gap="xs">
                      <IconCode size={16} style={{ color: 'var(--mantine-color-dimmed)' }} />
                      <Text size="sm">{user.projectsCompleted}</Text>
                      <IconStar size={16} style={{ color: 'var(--mantine-color-yellow-5)' }} />
                      <Text size="sm">{user.rating}</Text>
                    </Group>
                  </GridCol>
                  <GridCol span={2}>
                    {user.availabilityStatus === 'available'
                      ? (
                          <Badge leftSection={<IconBriefcase size={14} />}>
                            Available
                            {user.availabilityDate && (
                              <Text size="xs" c="dimmed">
                                {/* {user.availability_date} */}
                              </Text>
                            )}
                          </Badge>
                        )
                      : (
                          <Badge variant="outline">Not Available</Badge>
                        )}
                  </GridCol>
                </Grid>
              </Box>
            ))}
          </Card>
        </TabsPanel>
      </Tabs>
    </Container>
  );
}
