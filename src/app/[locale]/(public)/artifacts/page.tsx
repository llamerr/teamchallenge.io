import { db } from '@/libs/DB';
import { artifactsTable } from '@/models/Schema';
import { Badge, Button, Card, CardSection, Flex, Grid, GridCol, Input, Select, Tabs, TabsList, TabsPanel, TabsTab, Text } from '@mantine/core';
import { IconDatabase, IconDownload, IconFile as IconFilePresentation, IconFileText, IconFilter, IconLayout, IconSearch } from '@tabler/icons-react';
import { desc } from 'drizzle-orm';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

type ArtifactsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ArtifactsPageProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Artifacts',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

// Helper function to get icon based on category
function getCategoryIcon(category: string) {
  switch (category) {
    case 'design-doc':
      return <IconFileText />;
    case 'database':
      return <IconDatabase />;
    case 'ui-design':
      return <IconLayout />;
    case 'presentation':
      return <IconFilePresentation />;
    default:
      return <IconFileText />;
  }
}

// Helper function to get category label
function getCategoryLabel(category: string) {
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

// Fetch artifacts from database
async function fetchArtifacts() {
  try {
    const artifacts = await db.query.artifactsTable.findMany({
      with: {
        category: true,
        projects: true,
      },
      orderBy: desc(artifactsTable.dateCreated),
      limit: 10,
    });

    return artifacts;
  } catch (error) {
    console.error('Error fetching artifacts:', error);
    return [];
  }
}

export default async function ArtifactsPage(props: ArtifactsPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'Artifacts',
  });

  const artifacts = await fetchArtifacts();

  return (
    <Flex direction="column" p="md" maw={1200} mx="auto">
      <Flex justify="space-between" align="center" mb="lg">
        <Text fw={700} size="2xl">{t('title')}</Text>
        <Button>{t('upload_artifact_button')}</Button>
      </Flex>

      <Flex direction={{ base: 'column', md: 'row' }} gap="md" mb="lg">
        <Flex pos="relative" style={{ flex: 1 }}>
          <IconSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--mantine-color-gray-5)' }} />
          <Input
            placeholder={t('search_placeholder')}
            leftSection={<IconSearch />}
            style={{ paddingLeft: '40px' }}
          />
        </Flex>
        <Flex gap="md" align="center">
          <Select
            defaultValue="all"
            placeholder={t('category_filter')}
            data={[
              { value: 'all', label: t('all_categories') },
              { value: 'design-doc', label: t('category_design_doc') },
              { value: 'ui-design', label: t('category_ui_design') },
              { value: 'database', label: t('category_database') },
              { value: 'presentation', label: t('category_presentation') },
            ]}
            w={180}
          />
          <Button variant="outline" p="xs">
            <IconFilter size={16} />
          </Button>
        </Flex>
      </Flex>

      <Tabs defaultValue="grid" mb="lg">
        <Flex justify="space-between" align="center">
          <Text c="dimmed">
            {t('showing_artifacts', { count: artifacts.length })}
          </Text>
          <TabsList>
            <TabsTab value="grid">{t('view_grid')}</TabsTab>
            <TabsTab value="list">{t('view_list')}</TabsTab>
          </TabsList>
        </Flex>

        <TabsPanel value="grid" pt="md">
          <Grid>
            {artifacts.map(artifact => (
              <GridCol key={artifact.id} span={{ base: 12, md: 6, lg: 4 }}>
                <Card withBorder shadow="sm" radius="md">
                  <CardSection p="md" pb={0}>
                    <Flex align="center" gap="xs" mb="xs">
                      {getCategoryIcon(artifact.category?.icon || 'default')}
                      <Badge variant="light">{getCategoryLabel(artifact.category?.name || 'default')}</Badge>
                    </Flex>
                    <Text fw={600} truncate>
                      <Link href={`/artifacts/${artifact.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {artifact.title}
                      </Link>
                    </Text>
                  </CardSection>
                  <CardSection p="md">
                    <Text c="dimmed" lineClamp={2} mb="md">{artifact.description}</Text>
                    <Flex wrap="wrap" gap="xs" fz="sm">
                      <Flex align="center" gap="xs">
                        <Text c="dimmed">
                          {t('size_label')}
                          :
                        </Text>
                        <Text>{artifact.fileSize ? `${(artifact.fileSize / 1024).toFixed(2)} KB` : 'N/A'}</Text>
                      </Flex>
                      <Flex align="center" gap="xs">
                        <Text c="dimmed">
                          {t('projects_label')}
                          :
                        </Text>
                        <Text>{artifact.projects?.length || 0}</Text>
                      </Flex>
                    </Flex>
                  </CardSection>
                  <CardSection withBorder p="md">
                    <Flex justify="space-between" align="center">
                      <Flex align="center" gap="xs">
                        <Text c="dimmed">
                          {t('downloads_label')}
                          :
                        </Text>
                        <Text>{artifact.downloads || 0}</Text>
                      </Flex>
                      <Button size="xs" variant="light">
                        <IconDownload size={16} />
                      </Button>
                    </Flex>
                  </CardSection>
                </Card>
              </GridCol>
            ))}
          </Grid>
        </TabsPanel>

        <TabsPanel value="list" pt="md">
          <Grid>
            <GridCol span={5}>{t('list_column_artifact')}</GridCol>
            <GridCol span={2}>{t('list_column_category')}</GridCol>
            <GridCol span={1}>{t('list_column_type')}</GridCol>
            <GridCol span={1}>{t('list_column_size')}</GridCol>
            <GridCol span={1}>{t('list_column_projects')}</GridCol>
            <GridCol span={2}>{t('list_column_actions')}</GridCol>

            {artifacts.map(artifact => (
              <Grid key={artifact.id}>
                <GridCol span={5}>
                  <Flex align="center" gap="md">
                    <div style={{ padding: '8px', backgroundColor: 'var(--mantine-color-primary-100)', borderRadius: '50%' }}>
                      {getCategoryIcon(artifact.category?.icon || 'default')}
                    </div>
                    <div>
                      <Link href={`/artifacts/${artifact.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {artifact.title}
                      </Link>
                    </div>
                  </Flex>
                </GridCol>
                <GridCol span={2}>
                  <Badge variant="light">{getCategoryLabel(artifact.category?.name || 'default')}</Badge>
                </GridCol>
                <GridCol span={1}>{artifact.fileSize ? `${(artifact.fileSize / 1024).toFixed(2)} KB` : 'N/A'}</GridCol>
                <GridCol span={1}>{artifact.projects?.length || 0}</GridCol>
                <GridCol span={2}>
                  <Flex gap="xs">
                    <Button variant="outline" size="sm">
                      <Link href={`/artifacts/${artifact.id}`}>
                        {t('view_details')}
                      </Link>
                    </Button>
                    <Button variant="light" size="sm">
                      <IconDownload size={16} />
                    </Button>
                  </Flex>
                </GridCol>
              </Grid>
            ))}
          </Grid>
        </TabsPanel>
      </Tabs>
    </Flex>
  );
}
