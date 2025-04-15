import { db } from '@/libs/DB';
import { usersTable } from '@/models/users';
import { ActionIcon, Avatar, Badge, Box, Card, Container, Divider, Flex, Grid, GridCol, Group, Progress, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconCalendar, IconClock, IconGitBranch, IconMail, IconMapPin, IconUsers } from '@tabler/icons-react';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

// Fetch users from database
async function fetchUserById(id: string) {
  try {
    const user = await db.query.usersTable.findFirst({
      with: {
        userStats: true,
        userProfile: true,
        technologies: {
          with: {
            technology: true,
          },
        },
        artifacts: true,
        projectStages: {
          with: {
            stage: true,
          },
        },
        languages: {
          with: {
            language: true,
          },
        },
        roles: {
          with: {
            role: true,
          },
        },
        // TODO: is that deep nested tree ok?
        teams: {
          with: {
            team: {
              with: {
                project: {
                  with: {
                    technologies: {
                      with: {
                        technology: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      where: eq(usersTable.id, Number.parseInt(id)),
    });
    return user;
  } catch (error) {
    console.error('Error fetching users:', error);
    return undefined;
  }
}

export default async function UserProfilePage({ params }: { params: { id: string } }) {
  const user = await fetchUserById(params.id);
  console.log('user', user);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Container size="xl" py="xl">
      <Grid>
        {/* Left Sidebar */}
        <GridCol span={{ base: 12, lg: 4 }}>
          <Stack gap="lg">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Flex direction="column" align="center" ta="center">
                <Avatar src={user.userProfile?.avatar_url} alt={user.username} size={120} radius={120} mb="md">
                  {user.username
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </Avatar>
                <Title order={2} size="h3">
                  {user.username}
                </Title>
                <Text c="dimmed">{user.userProfile?.title}</Text>

                <Group mt="xs">
                  <IconMapPin size={16} style={{ color: 'var(--mantine-color-dimmed)' }} />
                  <Text size="sm" c="dimmed">
                    {user.userProfile?.location}
                  </Text>
                </Group>

                <Group mt="md">
                  <ActionIcon component="a" href={`mailto:${user.email}`} variant="light">
                    <IconMail size={18} />
                  </ActionIcon>
                  <ActionIcon
                    component="a"
                    href={`https://github.com/${user.userProfile?.github_username}`}
                    target="_blank"
                    variant="light"
                  >
                    <IconBrandGithub size={18} />
                  </ActionIcon>
                  <ActionIcon
                    component="a"
                    href={`https://linkedin.com/in/${user.userProfile?.linkedin_username}`}
                    target="_blank"
                    variant="light"
                  >
                    <IconBrandLinkedin size={18} />
                  </ActionIcon>
                  <ActionIcon
                    component="a"
                    href={`https://twitter.com/${user.userProfile?.twitter_username}`}
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
                      {user.userStats?.projects_completed}
                    </Text>
                    <Text size="sm" c="dimmed">
                      Projects
                    </Text>
                  </Box>
                  <Box ta="center">
                    <Text size="xl" fw={700}>
                      {user.userStats?.teams_led}
                    </Text>
                    <Text size="sm" c="dimmed">
                      Teams Led
                    </Text>
                  </Box>
                  <Box ta="center">
                    <Text size="xl" fw={700}>
                      {user.userStats?.artifacts_created}
                    </Text>
                    <Text size="sm" c="dimmed">
                      Artifacts
                    </Text>
                  </Box>
                  <Box ta="center">
                    <Text size="xl" fw={700}>
                      {user.userStats?.contributions}
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
                {user.userProfile?.about}
              </Text>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} size="h4" mb="md">
                Tech Stack
              </Title>
              <Group>
                {user.technologies.map(tech => (
                  <Badge key={tech.technology?.id} variant="light">
                    {tech.technology?.name}
                  </Badge>
                ))}
              </Group>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} size="h4" mb="md">
                Languages
              </Title>
              <Stack gap="sm">
                {user.languages?.map(language => (
                  <Flex key={language.language?.id} justify="space-between" align="center">
                    <Text>{language.language?.name}</Text>
                    <Badge variant="outline">{language.proficiencyLevel}</Badge>
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
                  <Badge key={role.role?.id} variant="outline">
                    {role.role?.name}
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
                {user.teams.filter(team => team.status === 'active').map(team => (
                  <Stack key={team.team?.id} gap="md">
                    <Flex justify="space-between" align="center">
                      <Text
                        component={Link}
                        href={`/projects/${team.team?.id}`}
                        size="lg"
                        fw={500}
                        style={{ textDecoration: 'none' }}
                      >
                        {team.team?.title}
                      </Text>
                      <Badge>{team.role}</Badge>
                    </Flex>

                    <Group gap="md">
                      <Group gap="xs">
                        <IconUsers size={16} style={{ color: 'var(--mantine-color-dimmed)' }} />
                        <Text size="sm" c="dimmed">
                          {team.team?.title}
                        </Text>
                      </Group>
                      <Group gap="xs">
                        <IconCalendar size={16} style={{ color: 'var(--mantine-color-dimmed)' }} />
                        <Text size="sm" c="dimmed">
                          Since
                          {' '}
                          {team.team?.startDate}
                        </Text>
                      </Group>
                    </Group>

                    <Box>
                      <Flex justify="space-between" mb="xs">
                        <Text size="sm" c="dimmed">
                          Progress
                        </Text>
                        <Text size="sm">
                          {team.team?.progress}
                          %
                        </Text>
                      </Flex>
                      <Progress value={team.team?.progress ?? 0} size="sm" />
                    </Box>

                    <Group>
                      {team.team?.project?.technologies?.map(tech => (
                        <Badge key={tech.technology?.id} variant="light">
                          {tech.technology?.name}
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
                {user.teams.filter(team => team.status !== 'active').map((project, index) => (
                  <Box key={project.team?.id}>
                    <Flex justify="space-between" align="flex-start" mb="sm">
                      <Box>
                        <Title order={4} size="h5">
                          {project.team?.title}
                        </Title>
                        <Text size="sm" c="dimmed">
                          {project.team?.description}
                        </Text>
                      </Box>
                      <Badge variant="outline">{project.role}</Badge>
                    </Flex>

                    <Group gap="md" mb="md">
                      <Group gap="xs">
                        <IconClock size={16} style={{ color: 'var(--mantine-color-dimmed)' }} />
                        <Text size="sm" c="dimmed">
                          {project.team?.startDate}
                        </Text>
                      </Group>
                      <Group gap="xs">
                        <IconCalendar size={16} style={{ color: 'var(--mantine-color-dimmed)' }} />
                        <Text size="sm" c="dimmed">
                          Completed
                        </Text>
                      </Group>
                    </Group>

                    <Group mb="md">
                      {project.team?.project?.technologies?.map(tech => (
                        <Badge key={tech.technology?.id} variant="light">
                          {tech.technology?.name}
                        </Badge>
                      ))}
                    </Group>

                    {/* <Box mb="md">
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
                    </Box> */}

                    {index < user.teams.filter(team => team.status !== 'active').length - 1 && <Divider my="md" />}
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
                      {artifact.title}
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
                      {/* <Group gap="xs">
                        <IconStar size={16} style={{ color: 'var(--mantine-color-yellow-5)' }} />
                        <Text size="sm" c="dimmed">
                          {artifact.}
                          {' '}
                          stars
                        </Text>
                      </Group> */}
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
