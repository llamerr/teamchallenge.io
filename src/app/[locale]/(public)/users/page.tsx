import { ActionIcon, Avatar, Badge, Box, Button, Card, Container, Flex, Grid, GridCol, Group, Select, Stack, Tabs, TabsList, TabsPanel, TabsTab, Text, TextInput, Title } from '@mantine/core';
import { IconBriefcase, IconCode, IconFilter, IconMapPin, IconSearch, IconStar } from '@tabler/icons-react';
import Link from 'next/link';

// Mock data for users
const users = [
  {
    id: '1',
    name: 'Jane Doe',
    title: 'Full Stack Developer',
    avatar: '/placeholder.svg?height=200&width=200',
    location: 'San Francisco, CA',
    lookingForProject: true,
    availability: 'Immediate',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    roles: ['Frontend Developer', 'Backend Developer'],
    projectsCompleted: 12,
    rating: 4.9,
    bio: 'Passionate developer with 5 years of experience in building scalable web applications.',
  },
  {
    id: '2',
    name: 'John Smith',
    title: 'UI/UX Designer',
    avatar: '/placeholder.svg?height=200&width=200',
    location: 'New York, NY',
    lookingForProject: true,
    availability: '2 weeks',
    skills: ['Figma', 'Adobe XD', 'UI Design', 'Prototyping'],
    roles: ['UI/UX Designer'],
    projectsCompleted: 8,
    rating: 4.7,
    bio: 'Creative designer focused on creating intuitive and beautiful user experiences.',
  },
  {
    id: '3',
    name: 'Emily Chen',
    title: 'Frontend Developer',
    avatar: '/placeholder.svg?height=200&width=200',
    location: 'Seattle, WA',
    lookingForProject: true,
    availability: '1 month',
    skills: ['React', 'Vue.js', 'CSS', 'JavaScript'],
    roles: ['Frontend Developer'],
    projectsCompleted: 6,
    rating: 4.8,
    bio: 'Frontend specialist with a keen eye for detail and performance optimization.',
  },
  {
    id: '4',
    name: 'Michael Brown',
    title: 'DevOps Engineer',
    avatar: '/placeholder.svg?height=200&width=200',
    location: 'Austin, TX',
    lookingForProject: false,
    availability: null,
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    roles: ['DevOps Engineer'],
    projectsCompleted: 10,
    rating: 4.6,
    bio: 'Infrastructure expert specializing in cloud-native solutions and automation.',
  },
  {
    id: '5',
    name: 'Sarah Wilson',
    title: 'Project Manager',
    avatar: '/placeholder.svg?height=200&width=200',
    location: 'Chicago, IL',
    lookingForProject: false,
    availability: null,
    skills: ['Agile', 'Scrum', 'Project Planning', 'Team Leadership'],
    roles: ['Project Manager'],
    projectsCompleted: 15,
    rating: 4.9,
    bio: 'Experienced project manager with a track record of delivering complex projects on time.',
  },
  {
    id: '6',
    name: 'David Lee',
    title: 'Backend Developer',
    avatar: '/placeholder.svg?height=200&width=200',
    location: 'Boston, MA',
    lookingForProject: true,
    availability: 'Immediate',
    skills: ['Node.js', 'Python', 'MongoDB', 'PostgreSQL'],
    roles: ['Backend Developer'],
    projectsCompleted: 9,
    rating: 4.7,
    bio: 'Backend specialist focused on building scalable and efficient server-side applications.',
  },
  {
    id: '7',
    name: 'Lisa Wang',
    title: 'Mobile Developer',
    avatar: '/placeholder.svg?height=200&width=200',
    location: 'Los Angeles, CA',
    lookingForProject: false,
    availability: null,
    skills: ['React Native', 'Swift', 'Kotlin', 'Firebase'],
    roles: ['Mobile Developer'],
    projectsCompleted: 7,
    rating: 4.8,
    bio: 'Mobile app developer with experience in both iOS and Android platforms.',
  },
  {
    id: '8',
    name: 'Alex Thompson',
    title: 'Data Scientist',
    avatar: '/placeholder.svg?height=200&width=200',
    location: 'Denver, CO',
    lookingForProject: true,
    availability: '2 weeks',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'TensorFlow'],
    roles: ['Data Scientist'],
    projectsCompleted: 5,
    rating: 4.6,
    bio: 'Data scientist specializing in machine learning and predictive analytics.',
  },
];

export default function UsersPage() {
  // Sort users to show those looking for projects first
  const sortedUsers = [...users].sort((a, b) => {
    if (a.lookingForProject && !b.lookingForProject) {
      return -1;
    }
    if (!a.lookingForProject && b.lookingForProject) {
      return 1;
    }
    return 0;
  });

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
            {sortedUsers.map(user => (
              <GridCol key={user.id} span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
                <Card shadow="sm" padding="md" radius="md" withBorder>
                  <Box
                    w="100%"
                    h={4}
                    bg={user.lookingForProject ? 'blue' : 'gray.3'}
                    mb="md"
                    style={{ marginLeft: -16, marginRight: -16, marginTop: -16, width: 'calc(100% + 32px)' }}
                  />
                  <Flex direction="column" align="center" mb="md">
                    <Avatar src={user.avatar} alt={user.name} size="xl" radius="xl" mb="md">
                      {user.name
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
                        {user.name}
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

                    {user.lookingForProject && (
                      <Badge mt="sm" leftSection={<IconBriefcase size={14} />}>
                        Looking for Projects
                      </Badge>
                    )}
                  </Flex>

                  <Text size="sm" c="dimmed" lineClamp={2} mb="md">
                    {user.bio}
                  </Text>

                  <Stack gap="md">
                    <Box>
                      <Text size="xs" c="dimmed" mb="xs">
                        Top Skills
                      </Text>
                      <Group gap="xs">
                        {user.skills.slice(0, 4).map(skill => (
                          <Badge key={skill} variant="outline" size="xs">
                            {skill}
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

            {sortedUsers.map((user, index) => (
              <Box key={user.id} p="md" bg={index % 2 === 0 ? 'white' : 'gray.0'}>
                <Grid align="center">
                  <GridCol span={4}>
                    <Group>
                      <Avatar src={user.avatar} alt={user.name} radius="xl">
                        {user.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </Avatar>
                      <Stack gap={0}>
                        <Text component={Link} href={`/users/${user.id}`} fw={500} style={{ textDecoration: 'none' }}>
                          {user.name}
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
                      {user.skills.slice(0, 2).map(skill => (
                        <Badge key={skill} variant="outline" size="xs">
                          {skill}
                        </Badge>
                      ))}
                      {user.skills.length > 2 && (
                        <Badge variant="outline" size="xs">
                          +
                          {user.skills.length - 2}
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
                    {user.lookingForProject
                      ? (
                          <Badge leftSection={<IconBriefcase size={14} />}>
                            Available
                            {user.availability}
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
