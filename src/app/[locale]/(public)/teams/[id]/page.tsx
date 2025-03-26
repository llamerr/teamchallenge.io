import { db } from '@/libs/DB';
import { teamsTable } from '@/models/teams';
import { Avatar, Badge, Box, Button, Card, CardSection, Flex, Grid, GridCol, Group, Paper, Progress, Stack, Tabs, TabsList, TabsPanel, TabsTab, Text, Title } from '@mantine/core';
import { IconArrowLeft, IconBrandGithub, IconBrandLinkedin, IconCalendar, IconCode, IconGitBranch, IconGitCommit, IconGitPullRequest, IconMail, IconMessage, IconSettings, IconUsers } from '@tabler/icons-react';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

// Mock data for a single team
const githubActivity = {
  repositories: [
    {
      name: 'e-commerce-frontend',
      type: 'frontend',
      url: 'https://github.com/org/e-commerce-frontend',
      branch: 'main',
      recentCommits: [
        {
          id: 'abc123',
          message: 'Implement new product catalog filtering',
          author: 'Mike Johnson',
          date: '2 hours ago',
          sha: 'abc123def456',
          branch: 'feature/product-filters',
        },
        {
          id: 'def456',
          message: 'Fix cart item count update',
          author: 'Mike Johnson',
          date: '5 hours ago',
          sha: 'def456ghi789',
          branch: 'fix/cart-count',
        },
        {
          id: 'ghi789',
          message: 'Update product card component styling',
          author: 'Emily Chen',
          date: '1 day ago',
          sha: 'ghi789jkl012',
          branch: 'feature/ui-updates',
        },
      ],
      pullRequests: [
        {
          id: 'pr1',
          title: 'Feature: Product Filtering',
          author: 'Mike Johnson',
          status: 'open',
          createdAt: '2 hours ago',
          reviewers: ['Emily Chen', 'Sarah Wilson'],
        },
        {
          id: 'pr2',
          title: 'Fix: Cart Count Updates',
          author: 'Mike Johnson',
          status: 'merged',
          createdAt: '3 hours ago',
          reviewers: ['David Lee'],
        },
      ],
    },
    {
      name: 'e-commerce-backend',
      type: 'backend',
      url: 'https://github.com/org/e-commerce-backend',
      branch: 'main',
      recentCommits: [
        {
          id: 'jkl012',
          message: 'Add caching layer for product queries',
          author: 'David Lee',
          date: '6 hours ago',
          sha: 'jkl012mno345',
          branch: 'feature/performance-optimization',
        },
      ],
      pullRequests: [],
    },
  ],
};

// Fetch teams from database
async function fetchTeam(id: string) {
  try {
    const team = await db.query.teamsTable.findFirst({
      with: {
        users: {
          with: {
            user: {
              with: {
                userProfile: true,
              },
            },
          },
        },
        recentActivities: true,
        project: {
          with: {
            category: true,
          },
        },
      },
      where: eq(teamsTable.id, Number.parseInt(id)),
    });
    return team;
  } catch (error) {
    console.error('Error fetching teams:', error);
    return undefined;
  }
}

export default async function TeamDetailPage({ params }: { params: { id: string } }) {
  const team = await fetchTeam(params.id);
  console.log(team);

  if (!team) {
    return <Text>Team not found</Text>;
  }

  return (
    <Box p="md">
      <Flex align="center" mb="xl" gap="md">
        <Button
          component={Link}
          href="/teams"
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
        >
          Back to Teams
        </Button>
        <Group style={{ flexGrow: 1 }}>
          <Title order={1}>
            {team.name}
          </Title>
          <Badge color={team.status === 'active' ? 'green' : 'gray'}>
            {team.status && (team.status.charAt(0).toUpperCase() + team.status.slice(1))}
          </Badge>
        </Group>
        <Group>
          <Button
            variant="outline"
            leftSection={<IconMessage size={16} />}
            component={Link}
            href={`/teams/${team.id}/chat`}
          >
            Team Chat
          </Button>
          <Button
            variant="filled"
            leftSection={<IconSettings size={16} />}
            component={Link}
            href={`/teams/${team.id}/settings`}
          >
            Settings
          </Button>
        </Group>
      </Flex>

      <Grid>
        <GridCol span={{ base: 12, lg: 8 }}>
          <Card withBorder radius="md" mb="md">
            <CardSection p="md">
              <Title order={2} mb="md">
                {team.name}
              </Title>
              <Text c="dimmed" mb="md">
                {team.description}
              </Text>

              <Flex justify="space-between" align="center" mb="xs">
                <Text>Project Progress</Text>
                <Text>
                  {team.progress}
                  %
                </Text>
              </Flex>
              <Progress value={team.progress || 0} />

              <Flex mt="md" justify="space-between">
                <Group>
                  <IconCalendar size={16} />
                  <Text>
                    Started:
                    {team.startDate}
                  </Text>
                </Group>
                <Group>
                  <IconCalendar size={16} />
                  <Text>
                    Est. End:
                    {/* {team.project.estimatedEndDate} */}
                  </Text>
                </Group>
              </Flex>
            </CardSection>
          </Card>

          <Tabs defaultValue="recent-activities">
            <TabsList>
              <TabsTab value="recent-activities" leftSection={<IconMessage size={16} />}>
                Recent Activities
              </TabsTab>
              <TabsTab value="github" leftSection={<IconBrandGithub size={16} />}>
                GitHub Activity
              </TabsTab>
            </TabsList>

            <TabsPanel value="recent-activities" pt="xs">
              <Stack>
                {team.recentActivities.map(activity => (
                  <Paper key={activity.id} withBorder p="md">
                    <Flex justify="space-between" align="center">
                      <Group>
                        <Badge
                          color={activity.type === 'artifact_modified' ? 'blue' : 'green'}
                        >
                          {activity.type === 'artifact_modified' ? 'Artifact' : 'Member'}
                        </Badge>
                        <Text>{activity.action}</Text>
                      </Group>
                      <Text c="dimmed" size="sm">
                        {activity.date?.toLocaleDateString()}
                      </Text>
                    </Flex>
                    <Text mt="xs" c="dimmed">
                      {activity.details}
                    </Text>
                  </Paper>
                ))}
              </Stack>
            </TabsPanel>

            <TabsPanel value="github" pt="xs">
              {githubActivity.repositories.map(repo => (
                <Card key={repo.name} withBorder mb="md">
                  <CardSection p="md">
                    <Flex justify="space-between" align="center" mb="md">
                      <Group>
                        <IconCode size={16} />
                        <Text fw={500}>{repo.name}</Text>
                        <Badge variant="light">{repo.type}</Badge>
                      </Group>
                      <Button
                        component="a"
                        href={repo.url}
                        target="_blank"
                        variant="subtle"
                        size="xs"
                      >
                        View Repository
                      </Button>
                    </Flex>

                    <Tabs defaultValue="commits">
                      <TabsList>
                        <TabsTab value="commits" leftSection={<IconGitCommit size={16} />}>
                          Commits
                        </TabsTab>
                        <TabsTab value="pull-requests" leftSection={<IconGitPullRequest size={16} />}>
                          Pull Requests
                        </TabsTab>
                      </TabsList>

                      <TabsPanel value="commits" pt="xs">
                        <Stack>
                          {repo.recentCommits.map(commit => (
                            <Paper key={commit.id} withBorder p="md">
                              <Flex justify="space-between" align="center">
                                <Group>
                                  <IconGitBranch size={16} />
                                  <Text>{commit.message}</Text>
                                </Group>
                                <Group>
                                  <Badge variant="light">{commit.branch}</Badge>
                                  <Text c="dimmed" size="sm">
                                    {commit.date}
                                  </Text>
                                </Group>
                              </Flex>
                              <Text mt="xs" c="dimmed">
                                Author:
                                {' '}
                                {commit.author}
                              </Text>
                            </Paper>
                          ))}
                        </Stack>
                      </TabsPanel>

                      <TabsPanel value="pull-requests" pt="xs">
                        <Stack>
                          {repo.pullRequests.map(pr => (
                            <Paper key={pr.id} withBorder p="md">
                              <Flex justify="space-between" align="center">
                                <Group>
                                  <IconGitPullRequest size={16} />
                                  <Text>{pr.title}</Text>
                                </Group>
                                <Group>
                                  <Badge
                                    color={pr.status === 'open' ? 'blue' : 'green'}
                                  >
                                    {pr.status.charAt(0).toUpperCase() + pr.status.slice(1)}
                                  </Badge>
                                  <Text c="dimmed" size="sm">
                                    {pr.createdAt}
                                  </Text>
                                </Group>
                              </Flex>
                              <Text mt="xs" c="dimmed">
                                Reviewers:
                                {' '}
                                {pr.reviewers.join(', ')}
                              </Text>
                            </Paper>
                          ))}
                        </Stack>
                      </TabsPanel>
                    </Tabs>
                  </CardSection>
                </Card>
              ))}
            </TabsPanel>
          </Tabs>
        </GridCol>

        <GridCol span={{ base: 12, lg: 4 }}>
          <Card withBorder radius="md">
            <CardSection p="md">
              <Flex justify="space-between" align="center" mb="md">
                <Title order={3}>Team Members</Title>
                <Group>
                  <IconUsers size={16} />
                  <Text>
                    {team.users.length}
                    {' '}
                    members
                  </Text>
                </Group>
              </Flex>

              <Stack>
                {team.users.map(member => (
                  <Paper key={member.userId} withBorder p="md">
                    <Flex align="center" gap="md">
                      <Avatar
                        src={member.user?.userProfile?.avatar_url}
                        alt={member.user?.username}
                        size="lg"
                        radius="xl"
                      />
                      <Stack gap="xs">
                        <Text fw={500}>{member.user?.username}</Text>
                        <Text c="dimmed" size="sm">
                          {member.role}
                        </Text>
                        <Group>
                          <Button
                            component="a"
                            href={`mailto:${member.user?.email}`}
                            variant="subtle"
                            size="xs"
                            leftSection={<IconMail size={16} />}
                          >
                            Email
                          </Button>
                          <Button
                            component="a"
                            href={`https://github.com/${member.user?.userProfile?.github_username}`}
                            target="_blank"
                            variant="subtle"
                            size="xs"
                            leftSection={<IconBrandGithub size={16} />}
                          >
                            GitHub
                          </Button>
                          <Button
                            component="a"
                            href={`https://linkedin.com/in/${member.user?.userProfile?.linkedin_username}`}
                            target="_blank"
                            variant="subtle"
                            size="xs"
                            leftSection={<IconBrandLinkedin size={16} />}
                          >
                            LinkedIn
                          </Button>
                        </Group>
                      </Stack>
                    </Flex>
                  </Paper>
                ))}
              </Stack>
            </CardSection>
            <CardSection p="md" withBorder>
              <Button
                fullWidth
                variant="filled"
                component={Link}
                href={`/teams/${team.id}/manage`}
                leftSection={<IconUsers size={16} />}
              >
                Manage Team
              </Button>
            </CardSection>
          </Card>
        </GridCol>
      </Grid>
    </Box>
  );
}
