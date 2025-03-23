'use client';

import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { ArrowRight, Check, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

// Helper function to get complexity badge color
function getComplexityColor(complexity: string) {
  switch (complexity) {
    case 'low':
      return { color: 'green', variant: 'light' };
    case 'medium':
      return { color: 'yellow', variant: 'light' };
    case 'high':
      return { color: 'red', variant: 'light' };
    default:
      return { color: 'gray', variant: 'light' };
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

type ProjectsStepProps = {
  userData: {
    selectedRoles: string[];
    selectedTech: string[];
  };
  onComplete: () => void;
  onBack: () => void;
};

// Mock data for available roles
const availableRoles = [
  { id: 'frontend', name: 'Frontend Developer' },
  { id: 'backend', name: 'Backend Developer' },
  { id: 'designer', name: 'UI/UX Designer' },
  { id: 'devops', name: 'DevOps Engineer' },
  { id: 'fullstack', name: 'Fullstack Developer' },
];

export default function ProjectsStep({ userData, onComplete, onBack }: ProjectsStepProps) {
  const theme = useMantineTheme();
  const [appliedProjects, setAppliedProjects] = useState<string[]>([]);
  const [showOwnProjectSection, setShowOwnProjectSection] = useState(false);
  const [recommendedTemplatesList, setRecommendedTemplatesList] = useState(projectTemplates);

  useEffect(() => {
    // Check if we should show the "start your own project" section
    if (appliedProjects.length === recommendedProjects.length || recommendedProjects.length === 0) {
      setShowOwnProjectSection(true);
    }

    // Get recommended templates based on user roles and tech stack
    if (userData.selectedRoles.length > 0) {
      setRecommendedTemplatesList(getRecommendedTemplates(userData.selectedRoles, userData.selectedTech));
    }
  }, [appliedProjects, userData.selectedRoles, userData.selectedTech]);

  const handleApplyToProject = (projectId: string) => {
    setAppliedProjects(prev => [...prev, projectId]);

    // If this was the last project, show the own project section
    if (appliedProjects.length === recommendedProjects.length - 1) {
      setShowOwnProjectSection(true);
    }
  };

  return (
    <Box p="md">
      <Stack spacing="xl">
        <Stack spacing="md">
          {recommendedProjects.map(project => (
            <Card key={project.id} shadow="sm" p="lg" radius="md" withBorder>
              <Stack spacing="md">
                <Box>
                  <Text fw={700} size="lg">
                    {project.title}
                  </Text>
                  <Text size="sm" color="dimmed" mt="xs">
                    {project.description}
                  </Text>
                </Box>

                <Group spacing="xs">
                  <Badge>{project.categoryLabel}</Badge>
                  <Badge
                    color={getComplexityColor(project.complexity).color}
                    variant={getComplexityColor(project.complexity).variant}
                  >
                    {project.complexity.charAt(0).toUpperCase() + project.complexity.slice(1)}
                    {' '}
                    Complexity
                  </Badge>
                </Group>

                <Box>
                  <Group position="apart" mb="xs">
                    <Text size="sm" color="dimmed">
                      Progress
                    </Text>
                    <Text size="sm">
                      {project.progress}
                      %
                    </Text>
                  </Group>
                  <Progress value={project.progress} size="sm" radius="xs" />
                </Box>

                <SimpleGrid cols={2}>
                  <Box>
                    <Text size="sm" fw={500} mb="xs">
                      Open Roles
                    </Text>
                    <Group spacing="xs">
                      {project.openRoles.map(role => (
                        <Badge
                          key={role}
                          variant="outline"
                          color={
                            userData.selectedRoles.some((r) => {
                              const roleObj = availableRoles.find(ar => ar.id === r);
                              return roleObj && roleObj.name === role;
                            })
                              ? 'blue'
                              : 'gray'
                          }
                        >
                          {role}
                        </Badge>
                      ))}
                    </Group>
                  </Box>

                  <Box>
                    <Text size="sm" fw={500} mb="xs">
                      Technologies
                    </Text>
                    <Group spacing="xs">
                      {project.technologies.map(tech => (
                        <Badge
                          key={tech}
                          variant="outline"
                          color={userData.selectedTech.includes(tech) ? 'blue' : 'gray'}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </Group>
                  </Box>
                </SimpleGrid>

                <Group spacing="xs" mt="xs">
                  <Users size={14} color={theme.colors.gray[6]} />
                  <Text size="sm" color="dimmed">
                    Team of
                    {' '}
                    {project.teamSize}
                  </Text>
                  <Text size="sm" color="dimmed">
                    •
                  </Text>
                  <Text size="sm" color="dimmed">
                    Led by
                    {' '}
                    {project.teamLead}
                  </Text>
                </Group>

                {appliedProjects.includes(project.id)
                  ? (
                      <Box p="md" style={{ backgroundColor: theme.colors.green[0], borderRadius: theme.radius.sm }}>
                        <Group>
                          <Check size={16} color={theme.colors.green[6]} />
                          <Text size="sm" color={theme.colors.green[8]}>
                            You have applied to this project. The project manager will review your application and get back
                            to you soon.
                          </Text>
                        </Group>
                      </Box>
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

        {showOwnProjectSection && (
          <Box mt="xl">
            <Divider my="lg" label="No matching teams available right now?" labelPosition="center" />

            <Text align="center" fw={700} size="lg" mb="sm">
              Start your own project based on your skills and interests!
            </Text>
            <Text align="center" color="dimmed" mb="lg">
              Choose from these templates to get started quickly
            </Text>

            <SimpleGrid cols={1} spacing="md">
              {recommendedTemplatesList.slice(0, 3).map(template => (
                <Card key={template.id} shadow="sm" p="lg" radius="md" withBorder>
                  <Stack spacing="md">
                    <Group position="apart">
                      <Text fw={700} size="lg">
                        {template.title}
                      </Text>
                      <Badge variant="outline">{template.estimatedDuration}</Badge>
                    </Group>

                    <Text size="sm" color="dimmed">
                      {template.description}
                    </Text>

                    <Badge
                      color={getComplexityColor(template.complexity).color}
                      variant={getComplexityColor(template.complexity).variant}
                    >
                      {template.complexity.charAt(0).toUpperCase() + template.complexity.slice(1)}
                      {' '}
                      Complexity
                    </Badge>

                    <SimpleGrid cols={2}>
                      <Box>
                        <Text size="sm" fw={500} mb="xs">
                          Suggested Technologies
                        </Text>
                        <Group spacing="xs">
                          {userData.selectedRoles
                            .flatMap(role =>
                              template.suggestedTechnologies[role]?.map(tech => (
                                <Badge
                                  key={`${role}-${tech}`}
                                  variant="outline"
                                  color={userData.selectedTech.includes(tech) ? 'blue' : 'gray'}
                                >
                                  {tech}
                                </Badge>
                              )),
                            )
                            .filter((tech, index, self) => {
                              return index === self.findIndex(t => t.key.split('-')[1] === tech.key.split('-')[1]);
                            })}
                        </Group>
                      </Box>

                      <Box>
                        <Text size="sm" fw={500} mb="xs">
                          Learning Outcomes
                        </Text>
                        <Stack spacing={5}>
                          {template.learningOutcomes.slice(0, 2).map((outcome, index) => (
                            <Group key={index} spacing="xs" noWrap>
                              <ArrowRight size={12} />
                              <Text size="sm" color="dimmed">
                                {outcome}
                              </Text>
                            </Group>
                          ))}
                        </Stack>
                      </Box>
                    </SimpleGrid>

                    <Group position="right">
                      <Button>Start this project</Button>
                    </Group>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        )}

        <Group position="apart" mt="xl">
          <Button variant="subtle" onClick={onBack}>
            Back
          </Button>
          <Group spacing="md">
            <Button variant="outline" component={Link} href="/projects">
              Browse All Projects
            </Button>
            <Button component={Link} href="/dashboard" onClick={onComplete}>
              Complete Profile
            </Button>
          </Group>
        </Group>
      </Stack>
    </Box>
  );
}
