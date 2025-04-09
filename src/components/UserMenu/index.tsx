'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import { Avatar, Group, Menu, Text, UnstyledButton } from '@mantine/core';
import { IconChevronRight, IconLogout, IconUser } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import classes from './styles.module.css';

export function UserMenu() {
  const { isLoaded, userId, signOut } = useAuth();
  const { user } = useUser();
  const t = useTranslations('DashboardLayout');

  if (!isLoaded) {
    return null;
  }

  if (!userId) {
    return (
      <UnstyledButton
        component={Link}
        href="/sign-in"
        className={classes.user}
      >
        <Group>
          <Avatar
            radius="xl"
          />
          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              {t('sign_in')}
            </Text>
            <Text c="dimmed" size="xs">
              {t('sign_up')}
            </Text>
          </div>
          <IconChevronRight size={14} stroke={1.5} />
        </Group>
      </UnstyledButton>
    );
  }

  return (
    <Menu>
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group>
            <Avatar
              src={user?.imageUrl}
              radius="xl"
            />
            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {user?.fullName}
              </Text>
              <Text c="dimmed" size="xs">
                {user?.emailAddresses[0]?.emailAddress}
              </Text>
            </div>
            <IconChevronRight size={14} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          icon={<IconUser size={14} />}
          component={Link}
          href="/dashboard/user-profile"
        >
          {t('user_profile_link')}
        </Menu.Item>
        <Menu.Item
          onClick={() => signOut()}
          icon={<IconLogout size={14} />}
        >
          {t('sign_out')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
