import { db } from '@/libs/DB';
import { projectsTable } from '@/models/projects';
import { Badge, Box, Button, Card, CardSection, Flex, Grid, GridCol, Group, Progress, Stack, Text, Title } from '@mantine/core';
import { IconArrowLeft, IconBookmark, IconBrandGithub, IconCalendar, IconClock, IconCode, IconDatabase, IconExternalLink, IconFile, IconFileText, IconGitBranch, IconLayout, IconShoppingCart, IconStar, IconUsers } from '@tabler/icons-react';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

// Mock data for a single project
const project = {
  id: '1',
  title: 'E-commerce Platform',
  description:
    'A full-featured e-commerce platform with product listings, shopping cart, user accounts, and payment processing. This project is designed to help novice developers understand the complexities of building a modern e-commerce system with both frontend and backend components.',
  longDescription:
    'This e-commerce platform project is designed to provide a comprehensive learning experience for developers looking to understand how online stores work. It includes product catalog management, user authentication, shopping cart functionality, checkout process with payment integration, order management, and an admin dashboard.\n\nThe project follows best practices for web development, including responsive design, accessibility, security, and performance optimization. It\'s structured to allow incremental development, so team members can start with core features and progressively add more advanced functionality.',
  category: 'ssr-app',
  categoryLabel: 'SSR Application',
  complexity: 'high',
  longevity: 'long-term',
  duration: '3-4 months',
  teamSize: 4,
  teamComposition: [
    { role: 'Frontend Developer', skills: ['React', 'CSS', 'JavaScript'], count: 1 },
    { role: 'Backend Developer', skills: ['Node.js', 'API Design', 'Database'], count: 1 },
    { role: 'UI/UX Designer', skills: ['Figma', 'User Research', 'Prototyping'], count: 1 },
    { role: 'DevOps Engineer', skills: ['Docker', 'CI/CD', 'Cloud Services'], count: 1 },
  ],
  learningOutcomes: [
    'Understanding of full-stack web application architecture',
    'Experience with server-side rendering and SEO optimization',
    'Implementation of secure user authentication and authorization',
    'Integration with third-party payment processing services',
    'Database design for product catalogs and order management',
    'Deployment and scaling of web applications',
  ],
  technologies: [
    { name: 'Next.js', category: 'Frontend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Stripe', category: 'Payment' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Prisma', category: 'ORM' },
    { name: 'Jest', category: 'Testing' },
    { name: 'Docker', category: 'Deployment' },
    { name: 'Vercel', category: 'Hosting' },
  ],
  artifacts: [
    {
      id: 'a1',
      title: 'E-commerce Database Schema',
      category: 'database',
      description: 'Complete database schema with tables for products, users, orders, and payments.',
    },
    {
      id: 'a2',
      title: 'E-commerce UI Design',
      category: 'ui-design',
      description: 'Comprehensive UI design for product pages, cart, checkout, and user dashboard.',
    },
    {
      id: 'a3',
      title: 'System Architecture Document',
      category: 'design-doc',
      description: 'Technical architecture outlining the components and their interactions.',
    },
    {
      id: 'a4',
      title: 'API Documentation',
      category: 'design-doc',
      description: 'Documentation for all API endpoints with request/response examples.',
    },
    {
      id: 'a5',
      title: 'User Flow Diagrams',
      category: 'design-doc',
      description: 'Visual representation of user journeys through the application.',
    },
    {
      id: 'a6',
      title: 'Deployment Strategy',
      category: 'design-doc',
      description: 'Documentation on how to deploy and scale the application.',
    },
    {
      id: 'a7',
      title: 'Testing Strategy',
      category: 'design-doc',
      description: 'Approach for unit, integration, and end-to-end testing.',
    },
    {
      id: 'a8',
      title: 'Project Presentation',
      category: 'presentation',
      description: 'Slide deck for presenting the project and its features.',
    },
  ],
  similarProjects: [
    { id: '5', title: 'Blog Platform', category: 'ssr-app', complexity: 'medium', teamSize: 3 },
    { id: '6', title: 'API Gateway Service', category: 'backend', complexity: 'high', teamSize: 3 },
    { id: '8', title: 'Personal Finance Tracker', category: 'spa', complexity: 'medium', teamSize: 2 },
  ],
  progress: 85,
  stars: 124,
  forks: 37,
  lastUpdated: 'November 15, 2023',
  createdAt: 'August 22, 2023',
  repositoryUrl: 'https://github.com/example/ecommerce-platform',
  demoUrl: 'https://ecommerce-platform-demo.vercel.app',
};

// Helper function to get icon based on category
function getCategoryIcon(category: string, props?: any) {
  const iconProps = { size: 24, stroke: 1.5, ...props };
  switch (category) {
    case 'spa':
      return <IconCode {...iconProps} />;
    case 'ssr-app':
      return <IconShoppingCart {...iconProps} />;
    case 'mobile':
      return <IconCode {...iconProps} />;
    case 'backend':
      return <IconCode {...iconProps} />;
    case 'game':
      return <IconCode {...iconProps} />;
    default:
      return <IconCode {...iconProps} />;
  }
}

// Helper function to get artifact icon based on category
function getArtifactIcon(category: string) {
  switch (category) {
    case 'design-doc':
      return <IconFileText size={20} stroke={1.5} />;
    case 'database':
      return <IconDatabase size={20} stroke={1.5} />;
    case 'ui-design':
      return <IconLayout size={20} stroke={1.5} />;
    case 'presentation':
      return <IconFile size={20} stroke={1.5} />;
    default:
      return <IconFileText size={20} stroke={1.5} />;
  }
}

// Helper function to get artifact category label
function getArtifactCategoryLabel(category: string) {
  switch (category) {
    case 'design-doc':
      return 'Design Document';
    case 'database':
      return 'Database Schema';
    case 'ui-design':
      return 'UI Design';
    case 'presentation':
      return 'Presentation';
    default:
      return category;
  }
}

// Helper function to get complexity badge color
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

// Fetch projects from database
async function fetchProject(id: string) {
  try {
    const project = await db.query.projectsTable.findFirst({
      with: {
        technologies: {
          with: {
            technology: true,
          },
        },
        category: true,
        projectLearningOutcomes: true,
        roles: {
          with: {
            role: true,
          },
        },
        artifacts: {
          with: {
            artifact: {
              with: {
                category: true,
              },
            },
          },
        },
      },
      where: eq(projectsTable.id, Number.parseInt(id)),
    });
    return project;
  } catch (error) {
    console.error('Error fetching project:', error);
    return undefined;
  }
}

export default async function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const id = await params.id;
  const project = await fetchProject(id);

  console.log('project', project);
  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <Box p="md">
      <Button
        component={Link}
        href="/projects"
        variant="subtle"
        leftSection={<IconArrowLeft size={16} />}
        mb="md"
      >
        Back to Projects
      </Button>

      <Grid>
        <GridCol span={{ base: 12, lg: 8 }}>
          <Card withBorder mb="md">
            <CardSection p="md" pb={0}>
              <Flex align="center" justify="space-between" mb="md">
                <Group>
                  <Box bg="primary.1" p={5} style={{ borderRadius: 6 }}>
                    {getCategoryIcon(project.category?.icon || '')}
                  </Box>
                  <Title order={2}>{project.title}</Title>
                </Group>
                <Group>
                  {project.repositoryUrl && (
                    <Button
                      variant="outline"
                      leftSection={<IconBrandGithub size={16} />}
                      component="a"
                      href={project.repositoryUrl}
                      target="_blank"
                    >
                      Repository
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button
                      variant="filled"
                      leftSection={<IconExternalLink size={16} />}
                      component="a"
                      href={project.demoUrl}
                      target="_blank"
                    >
                      Live Demo
                    </Button>
                  )}
                </Group>
              </Flex>
              <Text c="dimmed" size="sm" mb="md">
                {project.description}
              </Text>
            </CardSection>

            <CardSection p="md" pt={0}>
              <Grid>
                <GridCol span={6}>
                  <Stack gap="xs">
                    <Group>
                      <IconCalendar size={16} stroke={1.5} />
                      <Text size="sm">
                        Created:
                        {project.createdAt?.toLocaleDateString()}
                      </Text>
                    </Group>
                    <Group>
                      <IconClock size={16} stroke={1.5} />
                      <Text size="sm">
                        Duration:
                        {project.duration}
                      </Text>
                    </Group>
                  </Stack>
                </GridCol>
                <GridCol span={6}>
                  <Stack gap="xs">
                    <Group>
                      <IconStar size={16} stroke={1.5} />
                      <Text size="sm">
                        Stars:
                        {project.stars}
                      </Text>
                    </Group>
                    <Group>
                      <IconGitBranch size={16} stroke={1.5} />
                      <Text size="sm">
                        Forks:
                        {project.forks}
                      </Text>
                    </Group>
                  </Stack>
                </GridCol>
              </Grid>
            </CardSection>

            <CardSection p="md" pt={0}>
              <Title order={4} mb="md">Project Progress</Title>
              <Progress value={project.progress || 0} size="lg" />
            </CardSection>
          </Card>

          <Card withBorder mb="md">
            <CardSection p="md">
              <Title order={4} mb="md">Long Description</Title>
              <Text>{project.longDescription}</Text>
            </CardSection>
          </Card>

          <Card withBorder mb="md">
            <CardSection p="md">
              <Title order={4} mb="md">Learning Outcomes</Title>
              <Stack gap="xs">
                {project.projectLearningOutcomes.map((outcome, index) => (
                  <Group key={index}>
                    <IconBookmark size={16} stroke={1.5} />
                    <Text>{outcome.outcome}</Text>
                  </Group>
                ))}
              </Stack>
            </CardSection>
          </Card>
        </GridCol>

        <GridCol span={{ base: 12, lg: 4 }}>
          <Card withBorder mb="md">
            <CardSection p="md">
              <Title order={4} mb="md">Project Details</Title>
              <Stack gap="xs">
                <Group justify="space-between">
                  <Text>Category</Text>
                  <Badge color={getComplexityColor(project.complexity || '')}>
                    {project.category?.name}
                  </Badge>
                </Group>
                <Group justify="space-between">
                  <Text>Complexity</Text>
                  <Badge color={getComplexityColor(project.complexity || '')}>
                    {project.complexity || ''}
                  </Badge>
                </Group>
                <Group justify="space-between">
                  <Text>Team Size</Text>
                  <Group>
                    <IconUsers size={16} stroke={1.5} />
                    <Text>
                      {project.teamSize}
                      {' '}
                      members
                    </Text>
                  </Group>
                </Group>
              </Stack>
            </CardSection>
          </Card>

          <Card withBorder mb="md">
            <CardSection p="md">
              <Title order={4} mb="md">Team Composition</Title>
              <Stack gap="xs">
                {project.roles.map((role, index) => (
                  <Group key={index} justify="space-between">
                    <Text>{role.role?.name || ''}</Text>
                    <Badge color="blue">
                      {(role.role?.defaultCount || 0)}
                      {' '}
                      {(role.role?.defaultCount || 0) > 1 ? 'members' : 'member'}
                    </Badge>
                  </Group>
                ))}
              </Stack>
            </CardSection>
          </Card>

          <Card withBorder mb="md">
            <CardSection p="md">
              <Title order={4} mb="md">Technologies</Title>
              <Group>
                {project.technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    color="gray"
                    variant="outline"
                  >
                    {tech.technology?.name || ''}
                  </Badge>
                ))}
              </Group>
            </CardSection>
          </Card>

          <Card withBorder mb="md">
            <CardSection p="md">
              <Title order={4} mb="md">Project Artifacts</Title>
              <Stack gap="xs">
                {project.artifacts.map(artifact => (
                  <Group key={artifact.artifactId} align="center">
                    {getArtifactIcon(artifact.artifact?.category?.icon || '')}
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{artifact.artifact?.title}</Text>
                      <Text size="xs" c="dimmed">
                        {getArtifactCategoryLabel(artifact.artifact?.category?.name || '')}
                      </Text>
                    </Stack>
                  </Group>
                ))}
              </Stack>
            </CardSection>
          </Card>

          <Card withBorder>
            <CardSection p="md">
              <Title order={4} mb="md">Similar Projects</Title>
              <Stack gap="xs">
                {/* {project.similarProjects.map(similar => (
                  <Group key={similar.id} justify="space-between" align="center">
                    <Group>
                      {getCategoryIcon(similar.category, { size: 20 })}
                      <Text>{similar.title}</Text>
                    </Group>
                    <Badge color={getComplexityColor(similar.complexity)}>
                      {similar.complexity.charAt(0).toUpperCase() + similar.complexity.slice(1)}
                    </Badge>
                  </Group>
                ))} */}
              </Stack>
            </CardSection>
          </Card>
        </GridCol>
      </Grid>
    </Box>
  );
}
