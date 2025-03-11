import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Card,
  CardSection,
  Flex,
  Grid,
  GridCol,
  Group,
  Progress,
  Select,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { IconArrowRight, IconCalendar, IconFilter, IconSearch, IconUsers } from '@tabler/icons-react';
import Link from 'next/link';

// Mock data for teams
const teams = [
  {
    id: '1',
    name: 'Team Alpha',
    project: {
      id: '1',
      name: 'E-commerce Platform',
      category: 'ssr-app',
      progress: 75,
    },
    members: [
      { id: '1', name: 'Sarah Wilson', role: 'Project Manager', avatar: '/placeholder.svg' },
      { id: '2', name: 'Mike Johnson', role: 'Frontend Developer', avatar: '/placeholder.svg' },
      { id: '3', name: 'Emily Chen', role: 'UI/UX Designer', avatar: '/placeholder.svg' },
      { id: '4', name: 'David Lee', role: 'Backend Developer', avatar: '/placeholder.svg' },
    ],
    startDate: '2023-10-01',
    status: 'active',
  },
  {
    id: '2',
    name: 'Team Beta',
    project: {
      id: '2',
      name: 'Real-time Chat Application',
      category: 'spa',
      progress: 60,
    },
    members: [
      { id: '5', name: 'Alex Thompson', role: 'Project Manager', avatar: '/placeholder.svg' },
      { id: '6', name: 'Lisa Wang', role: 'Frontend Developer', avatar: '/placeholder.svg' },
      { id: '7', name: 'James Smith', role: 'Backend Developer', avatar: '/placeholder.svg' },
    ],
    startDate: '2023-11-15',
    status: 'active',
  },
  {
    id: '3',
    name: 'Team Gamma',
    project: {
      id: '3',
      name: 'Task Management System',
      category: 'spa',
      progress: 40,
    },
    members: [
      { id: '8', name: 'Rachel Brown', role: 'Project Manager', avatar: '/placeholder.svg' },
      { id: '9', name: 'Daniel Kim', role: 'Frontend Developer', avatar: '/placeholder.svg' },
      { id: '10', name: 'Sophie Martinez', role: 'UI/UX Designer', avatar: '/placeholder.svg' },
    ],
    startDate: '2023-12-01',
    status: 'active',
  },
  {
    id: '4',
    name: 'Team Delta',
    project: {
      id: '4',
      name: 'Mobile Weather App',
      category: 'mobile',
      progress: 90,
    },
    members: [
      { id: '11', name: 'Tom Wilson', role: 'Project Manager', avatar: '/placeholder.svg' },
      { id: '12', name: 'Anna Lee', role: 'Mobile Developer', avatar: '/placeholder.svg' },
      { id: '13', name: 'Chris Taylor', role: 'UI/UX Designer', avatar: '/placeholder.svg' },
    ],
    startDate: '2023-09-15',
    status: 'active',
  },
];

export default function TeamsPage() {
  return (
    <Box p="md">
      <Flex justify="space-between" align="center" mb="xl">
        <Title order={1}>Teams</Title>
        <Button component={Link} href="/create/team">
          Create Team
        </Button>
      </Flex>

      <Grid mb="xl" align="center">
        <GridCol span={{ base: 12, lg: 5 }}>
          <TextInput
            placeholder="Search teams..."
            leftSection={<IconSearch size={16} />}
          />
        </GridCol>

        <GridCol span={{ base: 12, lg: 5 }}>
          <Group>
            <Select
              placeholder="Project Type"
              data={[
                { value: 'all', label: 'All Projects' },
                { value: 'spa', label: 'Single Page Apps' },
                { value: 'ssr-app', label: 'SSR Applications' },
                { value: 'mobile', label: 'Mobile Apps' },
                { value: 'backend', label: 'Backend Services' },
              ]}
              defaultValue="all"
            />
            <Select
              placeholder="Status"
              data={[
                { value: 'all', label: 'All Status' },
                { value: 'active', label: 'Active' },
                { value: 'completed', label: 'Completed' },
                { value: 'on-hold', label: 'On Hold' },
              ]}
              defaultValue="all"
            />
          </Group>
        </GridCol>

        <GridCol span={{ base: 12, lg: 2 }}>
          <Button variant="outline" p="xs">
            <IconFilter size={16} />
          </Button>
        </GridCol>
      </Grid>

      <Grid>
        {teams.map(team => (
          <GridCol key={team.id} span={{ base: 12, md: 6, lg: 4 }}>
            <Card withBorder radius="md" h="100%">
              <CardSection p="md">
                <Flex justify="space-between" mb="xs">
                  <Badge variant="light" color="blue">
                    {team.project.category === 'ssr-app'
                      ? 'SSR Application'
                      : team.project.category === 'spa'
                        ? 'Single Page App'
                        : team.project.category === 'mobile'
                          ? 'Mobile App'
                          : team.project.category}
                  </Badge>
                  <Badge color={team.status === 'active' ? 'green' : 'gray'}>
                    {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                  </Badge>
                </Flex>

                <Flex direction="column" gap="xs">
                  <Title order={3}>{team.name}</Title>
                  <Text
                    component={Link}
                    href={`/projects/${team.project.id}`}
                    c="dimmed"
                    size="sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    {team.project.name}
                    <IconArrowRight size={16} />
                  </Text>
                </Flex>
              </CardSection>

              <CardSection p="md">
                <Flex direction="column" gap="md">
                  <Box>
                    <Flex justify="space-between" mb="xs" size="sm">
                      <Text c="dimmed">Project Progress</Text>
                      <Text>
                        {team.project.progress}
                        %
                      </Text>
                    </Flex>
                    <Progress value={team.project.progress} />
                  </Box>

                  <Flex align="center" gap="xs">
                    <IconCalendar size={16} color="gray" />
                    <Text size="sm">
                      Started
                      {team.startDate}
                    </Text>
                  </Flex>

                  <Flex direction="column" gap="xs">
                    <Flex align="center" gap="xs">
                      <IconUsers size={16} color="gray" />
                      <Text size="sm">
                        {team.members.length}
                        {' '}
                        team members
                      </Text>
                    </Flex>
                    <AvatarGroup>
                      {team.members.slice(0, 4).map(member => (
                        <Avatar
                          key={member.id}
                          src={member.avatar}
                          alt={member.name}
                          radius="xl"
                        />
                      ))}
                    </AvatarGroup>
                  </Flex>
                </Flex>
              </CardSection>

              <CardSection p="md" withBorder>
                <Button
                  component={Link}
                  href={`/teams/${team.id}`}
                  fullWidth
                  rightSection={<IconArrowRight size={16} />}
                >
                  View Team Details
                </Button>
              </CardSection>
            </Card>
          </GridCol>
        ))}
      </Grid>
    </Box>
  );
}
