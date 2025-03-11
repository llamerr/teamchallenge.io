'use client';

import type React from 'react';

import { ActionIcon, Avatar, Badge, Box, Button, Card, Container, Divider, Flex, Grid, Group, List, Paper, Progress, Select, SimpleGrid, Stack, Text, Textarea, TextInput, ThemeIcon, Title } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconBriefcase, IconChartLine, IconCheck, IconCode, IconMapPin, IconPalette, IconPlus, IconServer, IconUsers, IconWorld, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Mock data for roles
const availableRoles = [
  { id: 'frontend', name: 'Frontend Developer', icon: <IconCode size={16} /> },
  { id: 'backend', name: 'Backend Developer', icon: <IconServer size={16} /> },
  { id: 'fullstack', name: 'Full Stack Developer', icon: <IconCode size={16} /> },
  { id: 'designer', name: 'UI/UX Designer', icon: <IconPalette size={16} /> },
  { id: 'pm', name: 'Project Manager', icon: <IconBriefcase size={16} /> },
  { id: 'devops', name: 'DevOps Engineer', icon: <IconWorld size={16} /> },
  { id: 'data', name: 'Data Scientist', icon: <IconChartLine size={16} /> },
  { id: 'qa', name: 'QA Engineer', icon: <IconCheck size={16} /> },
];

// Mock data for technologies
const technologies = {
  frontend: ['React', 'Vue.js', 'Angular', 'Next.js', 'Svelte', 'HTML/CSS', 'JavaScript', 'TypeScript', 'Tailwind CSS'],
  backend: ['Node.js', 'Python', 'Java', 'C#', 'Ruby', 'Go', 'PHP', 'Express', 'Django', 'Spring Boot', 'ASP.NET'],
  database: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'Firebase', 'DynamoDB', 'Cassandra'],
  devops: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'CI/CD', 'Terraform', 'Jenkins', 'GitHub Actions'],
  design: ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'UI Design', 'UX Research', 'Prototyping'],
  mobile: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic', 'Xamarin'],
  other: ['GraphQL', 'REST API', 'WebSockets', 'Microservices', 'Agile', 'Scrum', 'Git'],
};

// Mock data for languages
const languagesData = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Russian', 'Portuguese'];

// Mock data for projects
const recommendedProjects = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description:
      'A full-featured e-commerce platform with product listings, shopping cart, user accounts, and payment processing.',
    category: 'ssr-app',
    categoryLabel: 'SSR Application',
    complexity: 'high',
    teamSize: 4,
    openRoles: ['Frontend Developer', 'Backend Developer'],
    technologies: ['Next.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    progress: 35,
    teamLead: 'Sarah Wilson',
  },
  {
    id: '2',
    title: 'Real-time Chat Application',
    description: 'A chat application with real-time messaging, user presence indicators, and message history.',
    category: 'spa',
    categoryLabel: 'Single Page Application',
    complexity: 'medium',
    teamSize: 3,
    openRoles: ['Frontend Developer', 'UI/UX Designer'],
    technologies: ['React', 'Socket.io', 'Express', 'MongoDB'],
    progress: 20,
    teamLead: 'Alex Thompson',
  },
  {
    id: '3',
    title: 'Task Management System',
    description: 'A project management tool with task tracking, assignments, deadlines, and progress reporting.',
    category: 'spa',
    categoryLabel: 'Single Page Application',
    complexity: 'medium',
    teamSize: 3,
    openRoles: ['Backend Developer', 'DevOps Engineer'],
    technologies: ['Vue.js', 'Node.js', 'Express', 'MongoDB'],
    progress: 50,
    teamLead: 'Rachel Brown',
  },
];

const projectTemplates = [
  {
    id: 'template1',
    title: 'Personal Portfolio Website',
    description: 'Create a professional portfolio website to showcase your skills and projects.',
    category: 'frontend',
    complexity: 'low',
    estimatedDuration: '2-4 weeks',
    recommendedRoles: ['frontend', 'designer'],
    suggestedTechnologies: {
      frontend: ['React', 'Next.js', 'Tailwind CSS'],
      designer: ['Figma', 'UI Design', 'Responsive Design'],
      fullstack: ['React', 'Next.js', 'Node.js', 'MongoDB'],
    },
    learningOutcomes: [
      'Building responsive layouts',
      'Creating engaging user interfaces',
      'Optimizing for performance',
      'Implementing contact forms',
    ],
  },
  {
    id: 'template2',
    title: 'Task Management Application',
    description: 'Build a task management app with user authentication, task creation, and organization features.',
    category: 'fullstack',
    complexity: 'medium',
    estimatedDuration: '4-8 weeks',
    recommendedRoles: ['frontend', 'backend', 'fullstack'],
    suggestedTechnologies: {
      frontend: ['React', 'Redux', 'Tailwind CSS'],
      backend: ['Node.js', 'Express', 'MongoDB'],
      fullstack: ['React', 'Node.js', 'Express', 'MongoDB'],
    },
    learningOutcomes: ['User authentication flows', 'State management', 'Database design', 'RESTful API development'],
  },
  {
    id: 'template3',
    title: 'E-commerce Store',
    description: 'Develop an online store with product listings, shopping cart, and checkout functionality.',
    category: 'fullstack',
    complexity: 'high',
    estimatedDuration: '8-12 weeks',
    recommendedRoles: ['frontend', 'backend', 'fullstack', 'designer'],
    suggestedTechnologies: {
      frontend: ['React', 'Next.js', 'Redux'],
      backend: ['Node.js', 'Express', 'PostgreSQL'],
      fullstack: ['Next.js', 'Prisma', 'PostgreSQL'],
      designer: ['Figma', 'UI Design', 'UX Research'],
    },
    learningOutcomes: [
      'Payment processing integration',
      'Shopping cart implementation',
      'Product catalog management',
      'Order processing workflows',
    ],
  },
];

// Helper function to get complexity color
function getComplexityColor(complexity: string) {
  switch (complexity) {
    case 'low':
      return 'green';
    case 'medium':
      return 'yellow';
    case 'high':
      return 'red';
    default:
      return 'gray';
  }
}

function getRecommendedTemplates(roles: string[], techStack: string[]) {
  // Filter templates that match at least one of the user's roles
  const roleMatches = projectTemplates.filter(template =>
    roles.some(role => template.recommendedRoles.includes(role)),
  );

  // Sort templates by how well they match the user's tech stack
  return roleMatches.sort((a, b) => {
    const aTechMatches = roles.reduce((count, role) => {
      if (a.suggestedTechnologies[role]) {
        return count + a.suggestedTechnologies[role].filter(tech => techStack.includes(tech)).length;
      }
      return count;
    }, 0);

    const bTechMatches = roles.reduce((count, role) => {
      if (b.suggestedTechnologies[role]) {
        return count + b.suggestedTechnologies[role].filter(tech => techStack.includes(tech)).length;
      }
      return count;
    }, 0);

    return bTechMatches - aTechMatches;
  });
}

export default function OnboardingPage() {
  const searchParams = useSearchParams();
  const preselectedRole = searchParams.get('role');

  // Mock user data that would come from auth provider
  const authUserData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/placeholder.svg?height=200&width=200',
  };

  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: authUserData.name,
    email: authUserData.email,
    title: '',
    location: '',
    bio: '',
    github: '',
    linkedin: '',
    twitter: '',
    website: '',
  });
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');
  const [languages, setLanguages] = useState<{ name: string; level: string }[]>([]);
  const [interestedProjects, setInterestedProjects] = useState<string[]>([]);
  const [appliedProjects, setAppliedProjects] = useState<string[]>([]);
  const [languageLevel, setLanguageLevel] = useState<string>('basic');

  const handleRoleToggle = (roleId: string) => {
    setSelectedRoles(prev => (prev.includes(roleId) ? prev.filter(id => id !== roleId) : [...prev, roleId]));
  };

  const handleAddTech = () => {
    if (techInput && !selectedTech.includes(techInput)) {
      setSelectedTech([...selectedTech, techInput]);
      setTechInput('');
    }
  };

  const handleAddLanguage = () => {
    if (techInput && !languages.some(lang => lang.name === techInput)) {
      setLanguages([...languages, { name: techInput, level: languageLevel }]);
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setSelectedTech(selectedTech.filter(t => t !== tech));
  };

  const handleRemoveLanguage = (langName: string) => {
    setLanguages(languages.filter(l => l.name !== langName));
  };

  const handleProjectToggle = (projectId: string) => {
    setInterestedProjects(prev =>
      prev.includes(projectId) ? prev.filter(id => id !== projectId) : [...prev, projectId],
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyToProject = (projectId: string) => {
    setAppliedProjects(prev => [...prev, projectId]);
  };

  // Set pre-selected role from URL parameter
  useEffect(() => {
    if (preselectedRole) {
      // Check if the role exists in our available roles
      const roleExists = availableRoles.some(role => role.id === preselectedRole);
      if (roleExists && !selectedRoles.includes(preselectedRole)) {
        setSelectedRoles([preselectedRole]);

        // Set a default title based on the selected role
        const roleName = availableRoles.find(role => role.id === preselectedRole)?.name || '';
        setUserData(prev => ({
          ...prev,
          title: roleName,
        }));
      }
    }
  }, [preselectedRole]);

  return (
    <Container size="md" py="xl">
      <Stack spacing="xl">
        <Box>
          <Title order={1} mb="xs">
            Complete Your Profile
          </Title>
          <Text c="dimmed">Let's set up your profile to help you find the perfect projects</Text>
        </Box>

        {/* Progress Steps */}
        <Box mb="xl">
          <Flex gap="md" align="center" mb="lg">
            {[1, 2, 3].map(stepNumber => (
              <Box key={stepNumber} sx={{ flex: 1, position: 'relative' }}>
                <Progress value={step >= stepNumber ? 100 : 0} radius="xl" size="sm" />
                <Text size="sm" c="dimmed" ta="center" mt="xs">
                  {stepNumber === 1 ? 'Basic Info' : stepNumber === 2 ? 'Skills & Roles' : 'Find Projects'}
                </Text>
              </Box>
            ))}
          </Flex>
        </Box>

        {step === 1 && (
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section withBorder inheritPadding py="xs">
              <Title order={3}>Personal Information</Title>
              <Text size="sm" c="dimmed">
                Tell us a bit about yourself
              </Text>
            </Card.Section>

            <Stack spacing="md" mt="md">
              <Flex direction="column" align="center" mb="md">
                <Avatar src={authUserData.avatar} alt={authUserData.name} size="xl" radius="xl" mb="sm" />
                <Button variant="outline" size="xs">
                  Change Photo
                </Button>
              </Flex>

              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Full Name"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    placeholder="Your email address"
                    disabled
                    description="Email is provided by your authentication provider"
                  />
                </Grid.Col>
              </Grid>

              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Professional Title"
                    name="title"
                    value={userData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Full Stack Developer"
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Location"
                    name="location"
                    value={userData.location}
                    onChange={handleInputChange}
                    placeholder="City, Country"
                    leftSection={<IconMapPin size={16} />}
                  />
                </Grid.Col>
              </Grid>

              <Textarea
                label="Bio"
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
                placeholder="Tell us a bit about yourself, your experience, and what you're looking for"
                minRows={4}
              />

              <Divider my="md" />

              <Box>
                <Text fw={500} mb="md">
                  Social Links (Optional)
                </Text>
                <Grid>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="GitHub"
                      name="github"
                      value={userData.github}
                      onChange={handleInputChange}
                      placeholder="username"
                      leftSection={<IconBrandGithub size={16} />}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="LinkedIn"
                      name="linkedin"
                      value={userData.linkedin}
                      onChange={handleInputChange}
                      placeholder="username"
                      leftSection={<IconBrandLinkedin size={16} />}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Twitter"
                      name="twitter"
                      value={userData.twitter}
                      onChange={handleInputChange}
                      placeholder="username"
                      leftSection={<IconBrandTwitter size={16} />}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Personal Website"
                      name="website"
                      value={userData.website}
                      onChange={handleInputChange}
                      placeholder="https://yourwebsite.com"
                      leftSection={<IconWorld size={16} />}
                    />
                  </Grid.Col>
                </Grid>
              </Box>
            </Stack>

            <Group position="apart" mt="xl">
              <Button component={Link} href="/" variant="subtle">
                Skip for now
              </Button>
              <Button onClick={() => setStep(2)}>Continue</Button>
            </Group>
          </Card>
        )}

        {step === 2 && (
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section withBorder inheritPadding py="xs">
              <Title order={3}>Skills & Roles</Title>
              <Text size="sm" c="dimmed">
                Tell us about your expertise and what roles you're interested in
              </Text>
            </Card.Section>

            <Stack spacing="xl" mt="md">
              <Box>
                <Text fw={500} mb="md">
                  What roles are you interested in?
                </Text>
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="sm">
                  {availableRoles.map(role => (
                    <Paper
                      key={role.id}
                      p="md"
                      withBorder
                      sx={theme => ({
                        cursor: 'pointer',
                        borderColor: selectedRoles.includes(role.id)
                          ? theme.colors.blue[5]
                          : theme.colorScheme === 'dark'
                            ? theme.colors.dark[4]
                            : theme.colors.gray[3],
                        backgroundColor: selectedRoles.includes(role.id)
                          ? theme.fn.rgba(theme.colors.blue[5], 0.1)
                          : undefined,
                      })}
                      onClick={() => handleRoleToggle(role.id)}
                    >
                      <Group position="apart">
                        <Group>
                          <ThemeIcon
                            size="md"
                            radius="md"
                            color={selectedRoles.includes(role.id) ? 'blue' : 'gray'}
                            variant={selectedRoles.includes(role.id) ? 'filled' : 'light'}
                          >
                            {role.icon}
                          </ThemeIcon>
                          <Text fw={500}>{role.name}</Text>
                        </Group>
                        {selectedRoles.includes(role.id) && <IconCheck size={16} color="var(--mantine-color-blue-5)" />}
                      </Group>
                    </Paper>
                  ))}
                </SimpleGrid>
              </Box>

              <Divider />

              <Box>
                <Text fw={500} mb="md">
                  Technical Skills
                </Text>
                <Group mb="sm">
                  <TextInput
                    placeholder="Add a skill..."
                    value={techInput}
                    onChange={e => setTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTech();
                      }
                    }}
                    sx={{ flex: 1 }}
                  />
                  <Button variant="default" onClick={handleAddTech} leftIcon={<IconPlus size={16} />}>
                    Add
                  </Button>
                </Group>

                {selectedTech.length > 0
                  ? (
                      <Group spacing="xs">
                        {selectedTech.map(tech => (
                          <Badge
                            key={tech}
                            size="lg"
                            variant="outline"
                            rightSection={(
                              <ActionIcon
                                size="xs"
                                radius="xl"
                                variant="transparent"
                                onClick={() => handleRemoveTech(tech)}
                              >
                                <IconX size={12} />
                              </ActionIcon>
                            )}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </Group>
                    )
                  : (
                      <Text size="sm" c="dimmed">
                        Add your technical skills like "React", "Node.js", "UI Design", etc.
                      </Text>
                    )}

                <Box mt="md">
                  <Text size="sm" fw={500} mb="xs">
                    Popular skills
                  </Text>
                  <Group spacing="xs">
                    {Object.entries(technologies)
                      .slice(0, 3)
                      .flatMap(([category, techs]) =>
                        techs.slice(0, 3).map(tech => (
                          <Badge
                            key={tech}
                            variant="outline"
                            sx={{ cursor: 'pointer' }}
                            onClick={() => {
                              if (!selectedTech.includes(tech)) {
                                setSelectedTech([...selectedTech, tech]);
                              }
                            }}
                            leftSection={<IconPlus size={10} />}
                          >
                            {tech}
                          </Badge>
                        )),
                      )}
                  </Group>
                </Box>
              </Box>

              <Divider />

              <Box>
                <Text fw={500} mb="md">
                  Languages (Optional)
                </Text>
                <Group mb="sm">
                  <TextInput
                    placeholder="Add a language..."
                    value={techInput}
                    onChange={e => setTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddLanguage();
                      }
                    }}
                    sx={{ flex: 1 }}
                  />
                  <Select
                    value={languageLevel}
                    onChange={value => setLanguageLevel(value || 'basic')}
                    data={[
                      { value: 'basic', label: 'Basic' },
                      { value: 'intermediate', label: 'Intermediate' },
                      { value: 'fluent', label: 'Fluent' },
                      { value: 'native', label: 'Native' },
                    ]}
                    w={140}
                  />
                  <Button variant="default" onClick={handleAddLanguage} leftIcon={<IconPlus size={16} />}>
                    Add
                  </Button>
                </Group>

                {languages.length > 0
                  ? (
                      <Group spacing="xs">
                        {languages.map(lang => (
                          <Badge
                            key={lang.name}
                            size="lg"
                            variant="outline"
                            rightSection={(
                              <ActionIcon
                                size="xs"
                                radius="xl"
                                variant="transparent"
                                onClick={() => handleRemoveLanguage(lang.name)}
                              >
                                <IconX size={12} />
                              </ActionIcon>
                            )}
                          >
                            {lang.name}
                            {' '}
                            (
                            {lang.level}
                            )
                          </Badge>
                        ))}
                      </Group>
                    )
                  : (
                      <Text size="sm" c="dimmed">
                        Add languages you speak and your proficiency level
                      </Text>
                    )}

                <Box mt="md">
                  <Text size="sm" fw={500} mb="xs">
                    Popular languages
                  </Text>
                  <Group spacing="xs">
                    {languagesData.slice(0, 6).map(lang => (
                      <Badge
                        key={lang}
                        variant="outline"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                          if (!languages.some(l => l.name === lang)) {
                            setLanguages([...languages, { name: lang, level: 'basic' }]);
                          }
                        }}
                        leftSection={<IconPlus size={10} />}
                      >
                        {lang}
                      </Badge>
                    ))}
                  </Group>
                </Box>
              </Box>
            </Stack>

            <Group position="apart" mt="xl">
              <Button variant="subtle" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={() => setStep(3)}>Continue</Button>
            </Group>
          </Card>
        )}

        {step === 3 && (
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section withBorder inheritPadding py="xs">
              <Title order={3}>Find Projects</Title>
              <Text size="sm" c="dimmed">
                Based on your skills and interests, here are some projects you might like
              </Text>
            </Card.Section>

            <Stack spacing="xl" mt="md">
              <Stack spacing="md">
                {recommendedProjects.map(project => (
                  <Card key={project.id} shadow="sm" padding="lg" radius="md" withBorder>
                    <Stack spacing="md">
                      <Box>
                        <Title order={4}>{project.title}</Title>
                        <Text size="sm" c="dimmed" mt="xs">
                          {project.description}
                        </Text>
                      </Box>

                      <Group spacing="xs">
                        <Badge variant="light">{project.categoryLabel}</Badge>
                        <Badge color={getComplexityColor(project.complexity)}>
                          {project.complexity.charAt(0).toUpperCase() + project.complexity.slice(1)}
                          {' '}
                          Complexity
                        </Badge>
                      </Group>

                      <Box>
                        <Group position="apart" mb="xs">
                          <Text size="sm" c="dimmed">
                            Progress
                          </Text>
                          <Text size="sm">
                            {project.progress}
                            %
                          </Text>
                        </Group>
                        <Progress value={project.progress} size="sm" radius="xl" />
                      </Box>

                      <Grid>
                        <Grid.Col span={6}>
                          <Text size="sm" fw={500} mb="xs">
                            Open Roles
                          </Text>
                          <Group spacing="xs">
                            {project.openRoles.map(role => (
                              <Badge
                                key={role}
                                variant="outline"
                                color={
                                  selectedRoles.some(r => availableRoles.find(ar => ar.id === r)?.name === role)
                                    ? 'blue'
                                    : 'gray'
                                }
                              >
                                {role}
                              </Badge>
                            ))}
                          </Group>
                        </Grid.Col>

                        <Grid.Col span={6}>
                          <Text size="sm" fw={500} mb="xs">
                            Technologies
                          </Text>
                          <Group spacing="xs">
                            {project.technologies.map(tech => (
                              <Badge key={tech} variant="outline" color={selectedTech.includes(tech) ? 'blue' : 'gray'}>
                                {tech}
                              </Badge>
                            ))}
                          </Group>
                        </Grid.Col>
                      </Grid>

                      <Group spacing="xs">
                        <IconUsers size={16} color="var(--mantine-color-dimmed)" />
                        <Text size="sm">
                          Team of
                          {project.teamSize}
                        </Text>
                        <Text size="sm" c="dimmed">
                          •
                        </Text>
                        <Text size="sm">
                          Led by
                          {project.teamLead}
                        </Text>
                      </Group>

                      {appliedProjects.includes(project.id)
                        ? (
                            <Paper p="sm" radius="md" bg="green.0" c="green.9" withBorder borderColor="green.5">
                              <Group>
                                <IconCheck size={16} />
                                <Text size="sm">
                                  You have applied to this project. The project manager will review your application and get
                                  back to you soon.
                                </Text>
                              </Group>
                            </Paper>
                          )
                        : (
                            <Group position="right">
                              <Button onClick={() => handleApplyToProject(project.id)}>Apply to the project</Button>
                            </Group>
                          )}
                    </Stack>
                  </Card>
                ))}
              </Stack>

              {recommendedProjects.length === 0 || appliedProjects.length === recommendedProjects.length
                ? (
                    <Box mt="xl" pt="xl" sx={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
                      <Box ta="center" mb="lg">
                        <Title order={3} mb="xs">
                          No matching teams available right now?
                        </Title>
                        <Text c="dimmed">Start your own project based on your skills and interests!</Text>
                      </Box>

                      <Stack spacing="md">
                        {getRecommendedTemplates(selectedRoles, selectedTech)
                          .slice(0, 3)
                          .map(template => (
                            <Card key={template.id} shadow="sm" padding="lg" radius="md" withBorder>
                              <Stack spacing="md">
                                <Group position="apart" align="flex-start">
                                  <Title order={4}>{template.title}</Title>
                                  <Badge variant="outline">{template.estimatedDuration}</Badge>
                                </Group>

                                <Text size="sm" c="dimmed">
                                  {template.description}
                                </Text>

                                <Group spacing="xs">
                                  <Badge color={getComplexityColor(template.complexity)}>
                                    {template.complexity.charAt(0).toUpperCase() + template.complexity.slice(1)}
                                    {' '}
                                    Complexity
                                  </Badge>
                                </Group>

                                <Grid>
                                  <Grid.Col span={6}>
                                    <Text size="sm" fw={500} mb="xs">
                                      Suggested Technologies
                                    </Text>
                                    <Group spacing="xs">
                                      {selectedRoles
                                        .flatMap(role =>
                                          template.suggestedTechnologies[role]?.map(tech => (
                                            <Badge
                                              key={`${role}-${tech}`}
                                              variant="outline"
                                              color={selectedTech.includes(tech) ? 'blue' : 'gray'}
                                            >
                                              {tech}
                                            </Badge>
                                          )),
                                        )
                                        .filter((tech, index, self) => {
                                          return (
                                            index === self.findIndex(t => t.key.split('-')[1] === tech.key.split('-')[1])
                                          );
                                        })}
                                    </Group>
                                  </Grid.Col>

                                  <Grid.Col span={6}>
                                    <Text size="sm" fw={500} mb="xs">
                                      Learning Outcomes
                                    </Text>
                                    <List size="sm" spacing="xs" c="dimmed">
                                      {template.learningOutcomes.slice(0, 2).map((outcome, index) => (
                                        <List.Item key={index}>{outcome}</List.Item>
                                      ))}
                                    </List>
                                  </Grid.Col>
                                </Grid>

                                <Group position="right">
                                  <Button>Start this project</Button>
                                </Group>
                              </Stack>
                            </Card>
                          ))}
                      </Stack>
                    </Box>
                  )
                : null}
            </Stack>

            <Group position="apart" mt="xl">
              <Button variant="subtle" onClick={() => setStep(2)}>
                Back
              </Button>
              <Group>
                <Button component={Link} href="/projects" variant="outline">
                  Browse All Projects
                </Button>
                <Button component={Link} href="/dashboard">
                  Complete Profile
                </Button>
              </Group>
            </Group>
          </Card>
        )}
      </Stack>
    </Container>
  );
}
