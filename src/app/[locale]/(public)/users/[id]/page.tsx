import { ActionIcon, Avatar, Badge, Box, Card, Container, Divider, Flex, Grid, GridCol, Group, Progress, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconCalendar, IconClock, IconGitBranch, IconMail, IconMapPin, IconStar, IconUsers } from '@tabler/icons-react';
import Link from 'next/link';

// Mock user data
const user = {
  id: '1',
  name: 'Jane Doe',
  title: 'Full Stack Developer',
  avatar: '/placeholder.svg',
  location: 'San Francisco, CA',
  about:
    'Passionate developer with 5 years of experience in building scalable web applications. Always eager to learn new technologies and contribute to innovative projects.',
  contact: {
    email: 'jane.doe@example.com',
    github: 'janedoe',
    linkedin: 'janedoe',
    twitter: 'janedoe',
    website: 'janedoe.dev',
  },
  techStack: [
    { name: 'JavaScript', category: 'Language' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'React', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Express', category: 'Backend' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'GraphQL', category: 'API' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'AWS', category: 'Cloud' },
  ],
  languages: [
    { name: 'English', level: 'Fluent' },
    { name: 'Spanish', level: 'Intermediate' },
    { name: 'French', level: 'Basic' },
  ],
  roles: ['Frontend Developer', 'Backend Developer', 'DevOps Engineer', 'Technical Lead'],
  preferredStages: ['Prototyping', 'MVP Development', 'Scaling'],
  currentProjects: [
    {
      id: '1',
      name: 'E-commerce Platform',
      role: 'Technical Lead',
      team: 'Team Alpha',
      progress: 75,
      technologies: ['Next.js', 'PostgreSQL', 'AWS'],
      startDate: 'October 2023',
    },
    {
      id: '2',
      name: 'Real-time Chat Application',
      role: 'Backend Developer',
      team: 'Team Beta',
      progress: 60,
      technologies: ['Node.js', 'Socket.io', 'MongoDB'],
      startDate: 'November 2023',
    },
  ],
  pastProjects: [
    {
      id: '3',
      name: 'AI-powered Chatbot',
      description: 'Developed NLP algorithms for improved user interactions',
      role: 'Backend Developer',
      technologies: ['Python', 'TensorFlow', 'FastAPI'],
      duration: '6 months',
      completedDate: 'September 2023',
      achievements: [
        'Improved response accuracy by 40%',
        'Reduced response time by 60%',
        'Implemented multi-language support',
      ],
    },
    {
      id: '4',
      name: 'Cloud Migration Project',
      description: 'Orchestrated migration of legacy systems to AWS infrastructure',
      role: 'DevOps Engineer',
      technologies: ['AWS', 'Terraform', 'Docker'],
      duration: '8 months',
      completedDate: 'July 2023',
      achievements: [
        'Reduced infrastructure costs by 30%',
        'Improved system reliability to 99.9%',
        'Implemented automated scaling',
      ],
    },
    {
      id: '5',
      name: 'Analytics Dashboard',
      description: 'Built real-time analytics dashboard for e-commerce platform',
      role: 'Frontend Developer',
      technologies: ['React', 'D3.js', 'GraphQL'],
      duration: '4 months',
      completedDate: 'March 2023',
      achievements: [
        'Reduced page load time by 50%',
        'Implemented real-time data updates',
        'Designed responsive mobile interface',
      ],
    },
  ],
  artifacts: [
    {
      id: '1',
      name: 'E-commerce Database Schema',
      type: 'database',
      downloads: 128,
      stars: 45,
    },
    {
      id: '2',
      name: 'React Component Library',
      type: 'ui-design',
      downloads: 256,
      stars: 89,
    },
    {
      id: '3',
      name: 'AWS Migration Guide',
      type: 'design-doc',
      downloads: 92,
      stars: 34,
    },
  ],
  stats: {
    projectsCompleted: 12,
    teamsLed: 4,
    artifactsCreated: 8,
    contributions: 156,
  },
};

export default function UserProfilePage({ params }: { params: { id: string } }) {
  return (
    <Container size="xl" py="xl">
      <Grid>
        {/* Left Sidebar */}
        <GridCol span={{ base: 12, lg: 4 }}>
          <Stack gap="lg">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Flex direction="column" align="center" ta="center">
                <Avatar src={user.avatar} alt={user.name} size={120} radius={120} mb="md">
                  {user.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </Avatar>
                <Title order={2} size="h3">
                  {user.name}
                </Title>
                <Text c="dimmed">{user.title}</Text>

                <Group mt="xs">
                  <IconMapPin size={16} style={{ color: 'var(--mantine-color-dimmed)' }} />
                  <Text size="sm" c="dimmed">
                    {user.location}
                  </Text>
                </Group>

                <Group mt="md">
                  <ActionIcon component="a" href={`mailto:${user.contact.email}`} variant="light">
                    <IconMail size={18} />
                  </ActionIcon>
                  <ActionIcon
                    component="a"
                    href={`https://github.com/${user.contact.github}`}
                    target="_blank"
                    variant="light"
                  >
                    <IconBrandGithub size={18} />
                  </ActionIcon>
                  <ActionIcon
                    component="a"
                    href={`https://linkedin.com/in/${user.contact.linkedin}`}
                    target="_blank"
                    variant="light"
                  >
                    <IconBrandLinkedin size={18} />
                  </ActionIcon>
                  <ActionIcon
                    component="a"
                    href={`https://twitter.com/${user.contact.twitter}`}
                    target="_blank"
                    variant="light"
                  >
                    <IconBrandTwitter size={18} />
                  </ActionIcon>
                </Group>

                <Divider my="md" w="100%" />

                <SimpleGrid cols={2} w="100%">
                  <Box ta="center">
                    <Text size="xl" fw={700}>
                      {user.stats.projectsCompleted}
                    </Text>
                    <Text size="sm" c="dimmed">
                      Projects
                    </Text>
                  </Box>
                  <Box ta="center">
                    <Text size="xl" fw={700}>
                      {user.stats.teamsLed}
                    </Text>
                    <Text size="sm" c="dimmed">
                      Teams Led
                    </Text>
                  </Box>
                  <Box ta="center">
                    <Text size="xl" fw={700}>
                      {user.stats.artifactsCreated}
                    </Text>
                    <Text size="sm" c="dimmed">
                      Artifacts
                    </Text>
                  </Box>
                  <Box ta="center">
                    <Text size="xl" fw={700}>
                      {user.stats.contributions}
                    </Text>
                    <Text size="sm" c="dimmed">
                      Contributions
                    </Text>
                  </Box>
                </SimpleGrid>
              </Flex>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} size="h4" mb="md">
                About
              </Title>
              <Text size="sm" c="dimmed">
                {user.about}
              </Text>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} size="h4" mb="md">
                Tech Stack
              </Title>
              <Group>
                {user.techStack.map(tech => (
                  <Badge key={tech.name} variant="light">
                    {tech.name}
                  </Badge>
                ))}
              </Group>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} size="h4" mb="md">
                Languages
              </Title>
              <Stack gap="sm">
                {user.languages.map(language => (
                  <Flex key={language.name} justify="space-between" align="center">
                    <Text>{language.name}</Text>
                    <Badge variant="outline">{language.level}</Badge>
                  </Flex>
                ))}
              </Stack>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} size="h4" mb="md">
                Roles
              </Title>
              <Group>
                {user.roles.map(role => (
                  <Badge key={role} variant="outline">
                    {role}
                  </Badge>
                ))}
              </Group>
            </Card>
          </Stack>
        </GridCol>

        {/* Main Content */}
        <GridCol span={{ base: 12, lg: 8 }}>
          <Stack gap="lg">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} size="h4" mb="xs">
                Current Projects
              </Title>
              <Text c="dimmed" size="sm" mb="md">
                Active projects and teams
              </Text>

              <Stack gap="xl">
                {user.currentProjects.map(project => (
                  <Stack key={project.id} gap="md">
                    <Flex justify="space-between" align="center">
                      <Text
                        component={Link}
                        href={`/projects/${project.id}`}
                        size="lg"
                        fw={500}
                        style={{ textDecoration: 'none' }}
                      >
                        {project.name}
                      </Text>
                      <Badge>{project.role}</Badge>
                    </Flex>

                    <Group gap="md">
                      <Group gap="xs">
                        <IconUsers size={16} style={{ color: 'var(--mantine-color-dimmed)' }} />
                        <Text size="sm" c="dimmed">
                          {project.team}
                        </Text>
                      </Group>
                      <Group gap="xs">
                        <IconCalendar size={16} style={{ color: 'var(--mantine-color-dimmed)' }} />
                        <Text size="sm" c="dimmed">
                          Since
                          {' '}
                          {project.startDate}
                        </Text>
                      </Group>
                    </Group>

                    <Box>
                      <Flex justify="space-between" mb="xs">
                        <Text size="sm" c="dimmed">
                          Progress
                        </Text>
                        <Text size="sm">
                          {project.progress}
                          %
                        </Text>
                      </Flex>
                      <Progress value={project.progress} size="sm" />
                    </Box>

                    <Group>
                      {project.technologies.map(tech => (
                        <Badge key={tech} variant="light">
                          {tech}
                        </Badge>
                      ))}
                    </Group>
                  </Stack>
                ))}
              </Stack>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} size="h4" mb="xs">
                Portfolio
              </Title>
              <Text c="dimmed" size="sm" mb="md">
                Past projects and achievements
              </Text>

              <Stack gap="xl">
                {user.pastProjects.map((project, index) => (
                  <Box key={project.id}>
                    <Flex justify="space-between" align="flex-start" mb="sm">
                      <Box>
                        <Title order={4} size="h5">
                          {project.name}
                        </Title>
                        <Text size="sm" c="dimmed">
                          {project.description}
                        </Text>
                      </Box>
                      <Badge variant="outline">{project.role}</Badge>
                    </Flex>

                    <Group gap="md" mb="md">
                      <Group gap="xs">
                        <IconClock size={16} style={{ color: 'var(--mantine-color-dimmed)' }} />
                        <Text size="sm" c="dimmed">
                          {project.duration}
                        </Text>
                      </Group>
                      <Group gap="xs">
                        <IconCalendar size={16} style={{ color: 'var(--mantine-color-dimmed)' }} />
                        <Text size="sm" c="dimmed">
                          Completed
                          {' '}
                          {project.completedDate}
                        </Text>
                      </Group>
                    </Group>

                    <Group mb="md">
                      {project.technologies.map(tech => (
                        <Badge key={tech} variant="light">
                          {tech}
                        </Badge>
                      ))}
                    </Group>

                    <Box mb="md">
                      <Text size="sm" fw={500} mb="xs">
                        Key Achievements
                      </Text>
                      <Stack gap="xs">
                        {project.achievements.map((achievement, i) => (
                          <Group key={i} gap="xs">
                            <Text size="sm" c="dimmed">
                              •
                            </Text>
                            <Text size="sm" c="dimmed">
                              {achievement}
                            </Text>
                          </Group>
                        ))}
                      </Stack>
                    </Box>

                    {index < user.pastProjects.length - 1 && <Divider my="md" />}
                  </Box>
                ))}
              </Stack>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} size="h4" mb="xs">
                Artifacts
              </Title>
              <Text c="dimmed" size="sm" mb="md">
                Shared resources and documentation
              </Text>

              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                {user.artifacts.map(artifact => (
                  <Card key={artifact.id} shadow="sm" padding="md" radius="md" withBorder>
                    <Text
                      component={Link}
                      href={`/artifacts/${artifact.id}`}
                      size="lg"
                      fw={500}
                      mb="md"
                      style={{ textDecoration: 'none' }}
                    >
                      {artifact.name}
                    </Text>
                    <Flex justify="space-between">
                      <Group gap="xs">
                        <IconGitBranch size={16} style={{ color: 'var(--mantine-color-dimmed)' }} />
                        <Text size="sm" c="dimmed">
                          {artifact.downloads}
                          {' '}
                          downloads
                        </Text>
                      </Group>
                      <Group gap="xs">
                        <IconStar size={16} style={{ color: 'var(--mantine-color-yellow-5)' }} />
                        <Text size="sm" c="dimmed">
                          {artifact.stars}
                          {' '}
                          stars
                        </Text>
                      </Group>
                    </Flex>
                  </Card>
                ))}
              </SimpleGrid>
            </Card>
          </Stack>
        </GridCol>
      </Grid>
    </Container>
  );
}
