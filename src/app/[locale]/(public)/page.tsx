import { Badge, Button, Card, Container, Grid, GridCol, Group, Stack, Text, Title } from '@mantine/core';
import { ArrowRight, Briefcase, Check, Code, LineChart, Palette, Server, Users } from 'lucide-react';
import Link from 'next/link';

// Role cards for quick onboarding
const quickJoinRoles = [
  {
    id: 'frontend',
    title: 'Frontend Developer',
    description: 'Build user interfaces and create engaging user experiences',
    icon: <Code size={24} />,
    skills: ['React', 'Vue.js', 'CSS', 'JavaScript'],
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    description: 'Develop server-side logic and integrate with databases',
    icon: <Server size={24} />,
    skills: ['Node.js', 'Python', 'Java', 'Databases'],
  },
  {
    id: 'designer',
    title: 'UI/UX Designer',
    description: 'Create beautiful designs and intuitive user experiences',
    icon: <Palette size={24} />,
    skills: ['Figma', 'UI Design', 'Prototyping', 'User Research'],
  },
  {
    id: 'pm',
    title: 'Project Manager',
    description: 'Lead teams and ensure successful project delivery',
    icon: <Briefcase size={24} />,
    skills: ['Agile', 'Scrum', 'Team Leadership', 'Planning'],
  },
  {
    id: 'data',
    title: 'Data Scientist',
    description: 'Analyze data and build machine learning models',
    icon: <LineChart size={24} />,
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'Statistics'],
  },
  {
    id: 'qa',
    title: 'QA Engineer',
    description: 'Ensure software quality through testing and automation',
    icon: <Check size={24} />,
    skills: ['Testing', 'Automation', 'Quality Assurance', 'Bug Tracking'],
  },
];

export default function Home() {
  return (
    <Container size="lg" py="xl">
      <Stack align="center" gap="xl" mb="xl">
        <Title order={1} ta="center">
          Welcome to DevArtifacts
        </Title>
        <Text size="lg" ta="center" c="dimmed">
          A platform for organizing and sharing project artifacts for novice developers.
        </Text>
      </Stack>

      <Stack gap="xl" mt="xl">
        <Title order={2} ta="center" mb="md">
          Join Our Community
        </Title>
        <Text ta="center" size="lg" c="dimmed" mx="auto" maw={600}>
          Select your role to get started with a personalized onboarding experience
        </Text>

        <Grid gutter="md">
          {quickJoinRoles.map(role => (
            <GridCol key={role.id} span={4}>
              <Card withBorder p="xl" h="100%">
                <Stack gap="md" h="100%" justify="space-between">
                  <Group justify="space-between" mb="md">
                    <Group gap="sm">
                      <div style={{ backgroundColor: '#3B82F61A', padding: '12px', borderRadius: '8px' }}>
                        {role.icon}
                      </div>
                      <Title order={3}>{role.title}</Title>
                    </Group>
                  </Group>
                  <Text size="sm" color="dimmed">
                    {role.description}
                  </Text>
                  <Group gap="xs" wrap="wrap">
                    {role.skills.map(skill => (
                      <Badge key={skill} variant="outline" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </Group>
                  <Button
                    fullWidth
                    component={Link}
                    href={`/onboarding?role=${role.id}`}
                    rightSection={<ArrowRight size={16} />}
                  >
                    Join as
                    {' '}
                    {role.title}
                  </Button>
                </Stack>
              </Card>
            </GridCol>
          ))}
        </Grid>

        <Group justify="center" mt="xl">
          <Button variant="outline" component={Link} href="/onboarding">
            <Users size={16} />
            {' '}
            Join with a custom role
          </Button>
        </Group>
      </Stack>

      <Container size="lg" py="xl" mt="xl">
        <Grid gutter="xl">
          <GridCol span={6}>
            <Stack gap="md">
              <Title order={2}>Find the Perfect Project</Title>
              <Text size="lg" color="dimmed">
                Browse through a variety of projects that match your skills and interests. Collaborate with other
                developers and build your portfolio.
              </Text>
              <Button component={Link} href="/projects">
                Explore Projects
              </Button>
            </Stack>
          </GridCol>
          <GridCol span={6}>
            <Stack gap="md">
              <Title order={2}>Share Your Knowledge</Title>
              <Text size="lg" color="dimmed">
                Create and share artifacts like database schemas, UI designs, and documentation. Help others learn and
                grow while showcasing your expertise.
              </Text>
              <Button component={Link} href="/artifacts">
                Browse Artifacts
              </Button>
            </Stack>
          </GridCol>
        </Grid>
      </Container>
    </Container>
  );
}
