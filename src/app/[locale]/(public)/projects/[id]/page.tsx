import { db } from '@/libs/DB';
import { projectsTable } from '@/models/projects';
import { Badge, Box, Button, Card, CardSection, Flex, Grid, GridCol, Group, Stack, Text, Title } from '@mantine/core';
import { IconArrowLeft, IconBookmark, IconBrandGithub, IconCalendar, IconClock, IconCode, IconDatabase, IconExternalLink, IconFile, IconFileText, IconGitBranch, IconLayout, IconShoppingCart, IconStar } from '@tabler/icons-react';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import StartProjectForm from './client';

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

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await fetchProject(id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <Box p="md">
      <Flex justify="space-between">
        <Button
          component={Link}
          href="/projects"
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
          mb="md"
        >
          Back to Projects
        </Button>
        <StartProjectForm project={project} />
      </Flex>

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
                  <Badge color={getComplexityColor(project.complexity || '')}>
                    {project.category?.name}
                  </Badge>
                  <Badge color={getComplexityColor(project.complexity || '')}>
                    {project.complexity || ''}
                  </Badge>
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
