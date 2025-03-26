import { db } from '@/libs/DB';
import {
  projectsTable,
} from '@/models/Schema';
import { Badge, Box, Button, Card, CardSection, Flex, Grid, GridCol, Group, MultiSelect, Select, Tabs, TabsList, TabsPanel, TabsTab, Text, TextInput, Title } from '@mantine/core';
import { IconChartBar, IconClock, IconCode, IconDeviceGamepad2, IconDeviceMobile, IconFilter, IconServer, IconShoppingCart, IconUsers } from '@tabler/icons-react';
import { desc } from 'drizzle-orm';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

// Helper function to get icon based on category
function getCategoryIcon(category: string | null = null) {
  const iconProps = { size: 20, stroke: 1.5 };
  switch (category) {
    case 'spa':
      return <IconCode {...iconProps} />;
    case 'ssr-app':
      return <IconShoppingCart {...iconProps} />;
    case 'mobile':
      return <IconDeviceMobile {...iconProps} />;
    case 'backend':
      return <IconServer {...iconProps} />;
    case 'game':
      return <IconDeviceGamepad2 {...iconProps} />;
    default:
      return <IconCode {...iconProps} />;
  }
}

// Helper function to get complexity color
function getComplexityColor(complexity: string | null = null) {
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

// Helper function to get longevity color
function getLongevityColor(longevity: string | null = null) {
  switch (longevity) {
    case 'short-term':
      return 'blue';
    case 'medium-term':
      return 'purple';
    case 'long-term':
      return 'indigo';
    default:
      return 'gray';
  }
}

// Generate metadata for the projects page
export async function generateMetadata(props: ProjectsPageProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Projects',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

// Fetch projects from database
async function fetchProjects({ limit = 10 }: { limit?: number }) {
  try {
    const projects = await db.query.projectsTable.findMany({
      with: {
        technologies: {
          with: {
            technology: true,
          },
        },
        category: true,
      },
      orderBy: desc(projectsTable.lastUpdated),
      limit,
    });
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function ProjectsPage(props: ProjectsPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: 'Projects',
  });

  const projects = await fetchProjects({ limit: 20 });

  return (
    <Box p="md">
      <Flex justify="space-between" align="center" mb="xl">
        <Title order={1}>{t('title')}</Title>
        <Button>{t('create_project_button')}</Button>
      </Flex>

      <Flex direction={{ base: 'column', md: 'row' }} gap="md" mb="lg">
        <Flex pos="relative" style={{ flex: 1 }}>
          <TextInput
            placeholder={t('search_placeholder')}
            leftSection={<IconFilter />}
            style={{ width: '100%' }}
          />
        </Flex>
        <Group>
          <Select
            placeholder={t('category_filter')}
            data={[
              { value: 'all', label: t('all_categories') },
              { value: 'spa', label: 'Single Page App' },
              { value: 'ssr-app', label: 'SSR Application' },
              { value: 'mobile', label: 'Mobile App' },
              { value: 'backend', label: 'Backend Service' },
              { value: 'game', label: 'Game Development' },
            ]}
            w={180}
          />
          <MultiSelect
            placeholder={t('technologies_filter')}
            data={[
              'Next.js',
              'React',
              'Vue.js',
              'Node.js',
              'PostgreSQL',
              'MongoDB',
              'Docker',
              'Unity',
            ]}
            w={200}
          />
        </Group>
      </Flex>

      <Tabs defaultValue="grid" mb="lg">
        <Flex justify="space-between" align="center">
          <Text c="dimmed">
            {t('showing_projects', { count: projects.length })}
          </Text>
          <TabsList>
            <TabsTab value="grid">{t('view_grid')}</TabsTab>
            <TabsTab value="list">{t('view_list')}</TabsTab>
          </TabsList>
        </Flex>

        <TabsPanel value="grid" pt="md">
          <Grid>
            {projects.map(project => (
              <GridCol key={project.id} span={{ base: 12, md: 6, lg: 4 }}>
                <Card withBorder shadow="sm" radius="md">
                  <CardSection p="md" pb={0}>
                    <Flex align="center" gap="xs" mb="xs">
                      {getCategoryIcon(project.category || 'default')}
                      <Badge variant="light" color={getComplexityColor(project.complexity)}>
                        {project.complexity}
                      </Badge>
                      <Badge variant="light" color={getLongevityColor(project.longevity)}>
                        {project.longevity}
                      </Badge>
                    </Flex>
                    <Text fw={600} truncate>
                      <Link href={`/projects/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {project.title}
                      </Link>
                    </Text>
                  </CardSection>
                  <CardSection p="md">
                    <Text c="dimmed" lineClamp={2} mb="md">{project.description}</Text>
                    <Flex wrap="wrap" gap="xs" fz="sm">
                      <Flex align="center" gap="xs">
                        <IconUsers size={16} stroke={1.5} />
                        <Text>
                          {project.teamSize}
                          {' '}
                          team members
                        </Text>
                      </Flex>
                      <Flex align="center" gap="xs">
                        <IconChartBar size={16} stroke={1.5} />
                        <Text>{project.technologies.map(tech => tech.technology?.name || '').join(', ')}</Text>
                      </Flex>
                    </Flex>
                  </CardSection>
                  <CardSection withBorder p="md">
                    <Flex justify="space-between" align="center">
                      <Flex align="center" gap="xs">
                        <IconClock size={16} stroke={1.5} />
                        <Text c="dimmed">
                          Last updated:
                          {project?.lastUpdated?.toLocaleString() || 'N/A'}
                        </Text>
                      </Flex>
                    </Flex>
                  </CardSection>
                </Card>
              </GridCol>
            ))}
          </Grid>
        </TabsPanel>
      </Tabs>
    </Box>
  );
}
