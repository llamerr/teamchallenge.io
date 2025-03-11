import { db } from '@/libs/DB';
import { artifactsTable } from '@/models/Schema';
import { Badge, Button, Card, CardSection, Container, Divider, Flex, Grid, GridCol, Group, Stack, Text, Title } from '@mantine/core';
import { IconArrowLeft, IconDatabase, IconDownload, IconEye, IconFile, IconFileText, IconLayout } from '@tabler/icons-react';
import { eq } from 'drizzle-orm';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Helper function to get icon based on category
function getCategoryIcon(category: string, size: number = 24) {
  switch (category) {
    case 'design-doc':
      return <IconFileText size={size} />;
    case 'database':
      return <IconDatabase size={size} />;
    case 'ui-design':
      return <IconLayout size={size} />;
    case 'presentation':
      return <IconFile size={size} />;
    default:
      return <IconFileText size={size} />;
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

// Fetch artifact details
async function fetchArtifactDetails(artifactId: string) {
  try {
    const artifact = await db.query.artifactsTable.findFirst({
      where: eq(artifactsTable.id, Number(artifactId)),
      with: {
        category: true,
        projects: {
          with: {
            project: true,
          },
        },
        artifactTags: {
          with: {
            artifactTag: true,
          },
        },
      },
    });

    if (!artifact) {
      return null;
    }

    // Fetch similar artifacts using the PostgreSQL function
    // const similarArtifactsResult = await db.execute(
    //   `SELECT * FROM get_similar_artifacts(${artifact.id})`,
    // );

    return {
      ...artifact,
      // similarArtifacts: similarArtifactsResult.rows,
    };
  } catch (error) {
    console.error('Error fetching artifact details:', error);
    return null;
  }
}

// Type definition for page props
type ArtifactDetailsPageProps = {
  params: Promise<{ locale: string; id: string }>;
};

// Generate metadata for the artifact page
export async function generateMetadata(props: ArtifactDetailsPageProps) {
  const { locale, id } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Artifacts',
  });

  try {
    const artifact = await fetchArtifactDetails(id);

    if (!artifact) {
      return {
        title: t('artifact_not_found'),
        description: t('artifact_not_found_description'),
      };
    }

    return {
      title: artifact.title,
      description: artifact.description || t('artifact_default_description'),
    };
  } catch {
    return {
      title: t('artifact_error'),
      description: t('artifact_error_description'),
    };
  }
}

export default async function ArtifactDetailsPage(props: ArtifactDetailsPageProps) {
  const { locale, id } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'Artifacts',
  });

  const artifact = await fetchArtifactDetails(id);

  if (!artifact) {
    notFound();
  }

  return (
    <Container size="xl" py="xl">
      <Button
        component={Link}
        href="/artifacts"
        variant="subtle"
        leftSection={<IconArrowLeft size={16} />}
        mb="md"
      >
        {t('back_to_artifacts')}
      </Button>

      <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" gap="md" mb="xl">
        <Group align="center">
          <Card withBorder p="sm" radius="md">
            {getCategoryIcon(artifact.category?.slug || 'default', 24)}
          </Card>
          <Stack gap="xs">
            <Title order={1} size="h2">{artifact.title}</Title>
            <Group>
              <Badge variant="light">
                {getCategoryLabel(artifact.category?.slug || 'default')}
              </Badge>
              <Text size="sm" c="dimmed">
                {t('version_label')}
                {' '}
                {artifact.versionNumber}
              </Text>
            </Group>
          </Stack>
        </Group>

        <Group>
          <Button
            variant="outline"
            leftSection={<IconEye size={16} />}
          >
            {t('preview_button')}
          </Button>
          <Button
            leftSection={<IconDownload size={16} />}
          >
            {t('download_button')}
          </Button>
        </Group>
      </Flex>

      <Grid>
        <GridCol span={{ base: 12, lg: 8 }}>
          <Stack>
            <Card withBorder>
              <CardSection p="md">
                <Title order={3} mb="md">{t('description_title')}</Title>
                <Text>{artifact.description}</Text>

                <Group mt="md" gap="xs">
                  {artifact.artifactTags?.map(({ artifactTag: tag }) => (
                    <Badge
                      key={tag?.name}
                      variant="outline"
                      size="sm"
                    >
                      {tag?.name}
                    </Badge>
                  ))}
                </Group>
              </CardSection>
            </Card>

            <Card withBorder>
              <CardSection p="md">
                <Title order={3} mb="md">{t('projects_using_title')}</Title>
                <Stack>
                  {artifact.projects?.map(({ project }, index) => (
                    <div key={project?.id}>
                      <Flex
                        key={project?.id}
                        justify="space-between"
                        align="center"
                      >
                        <Stack gap={4}>
                          <Text
                            component={Link}
                            href={`/projects/${project?.id}`}
                            fw={500}
                            td="underline"
                          >
                            {project?.title}
                          </Text>
                        </Stack>
                        <Button
                          component={Link}
                          href={`/projects/${project?.id}`}
                          variant="subtle"
                          size="compact-sm"
                        >
                          {t('view_project_button')}
                        </Button>
                      </Flex>
                      {index < (artifact.projects?.length || 0) - 1 && <Divider />}
                    </div>
                  ))}
                </Stack>
              </CardSection>
            </Card>

            {/* {artifact.similarArtifacts && artifact.similarArtifacts.length > 0 && (
              <Card withBorder>
                <CardSection p="md">
                  <Title order={3} mb="md">{t('similar_artifacts_title')}</Title>
                  <Grid>
                    {artifact.similarArtifacts.map(similar => (
                      <GridCol key={similar.id} span={{ base: 12, md: 4 }}>
                        <Card withBorder>
                          <CardSection p="md">
                            <Group mb="xs">
                              {getCategoryIcon(similar.category_slug, 20)}
                              <Badge variant="light" size="xs">
                                {getCategoryLabel(similar.category_slug)}
                              </Badge>
                            </Group>
                            <Text
                              component={Link}
                              href={`/artifacts/${similar.id}`}
                              fw={500}
                              td="underline"
                              lineClamp={1}
                            >
                              {similar.title}
                            </Text>
                          </CardSection>
                        </Card>
                      </GridCol>
                    ))}
                  </Grid>
                </CardSection>
              </Card>
            )} */}
          </Stack>
        </GridCol>

        <GridCol span={{ base: 12, lg: 4 }}>
          <Card withBorder>
            <CardSection p="md">
              <Title order={3}>{t('artifact_details_title')}</Title>
              <Stack gap="xs" mt="md">
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">{t('file_size_label')}</Text>
                  <Text size="sm">
                    {artifact.fileSize
                      ? `${(artifact.fileSize / 1024).toFixed(2)} KB`
                      : 'N/A'}
                  </Text>
                </Group>
                <Divider />
                {/* <Group justify="space-between">
                  <Text size="sm" c="dimmed">{t('author_label')}</Text>
                  <Text size="sm">{artifact.author || 'N/A'}</Text>
                </Group> */}
                <Divider />
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">{t('created_label')}</Text>
                  <Text size="sm">
                    {artifact.dateCreated
                      ? new Date(artifact.dateCreated).toLocaleDateString()
                      : 'N/A'}
                  </Text>
                </Group>
                <Divider />
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">{t('license_label')}</Text>
                  <Text size="sm">{artifact.license || 'N/A'}</Text>
                </Group>
              </Stack>
            </CardSection>
          </Card>
        </GridCol>
      </Grid>
    </Container>
  );
}
