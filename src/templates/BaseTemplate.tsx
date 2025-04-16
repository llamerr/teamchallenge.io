'use client';

import { AppConfig } from '@/utils/AppConfig';
import { AppShell, AppShellFooter, AppShellHeader, AppShellMain, AppShellNavbar, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const BaseTemplate = (props: {
  leftNav: React.ReactNode;
  rightNav?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const t = useTranslations('BaseTemplate');
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 0,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShellHeader>
        <Group justify="space-between" hiddenFrom="sm">
          <nav>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Link
              href="/"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              {t('home_link')}
            </Link>
          </nav>
          <nav>
            <ul className="flex flex-wrap gap-x-5 text-xl">
              {props.rightNav}
            </ul>
          </nav>
        </Group>
        <Group justify="space-between" visibleFrom="sm">
          <nav>
            <ul className="flex flex-wrap gap-x-5 text-xl">
              <Link
                href="/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t('home_link')}
              </Link>

              {props.leftNav}
            </ul>
          </nav>
          <nav>
            <ul className="flex flex-wrap gap-x-5 text-xl">
              {props.rightNav}
            </ul>
          </nav>
        </Group>
      </AppShellHeader>

      <AppShellNavbar p="md" hiddenFrom="sm">
        <ul className="flex flex-wrap gap-x-5 text-xl flex-col">
          {props.leftNav}
        </ul>
      </AppShellNavbar>

      <AppShellMain>{props.children}</AppShellMain>

      <AppShellFooter>
        {`© Copyright ${new Date().getFullYear()} ${AppConfig.name}. `}
        {t.rich('made_with', {
          author: () => (
            <a
              href="https://creativedesignsguru.com"
              className="text-blue-700 hover:border-b-2 hover:border-blue-700"
            >
              CreativeDesignsGuru
            </a>
          ),
        })}
        {/*
           * PLEASE READ THIS SECTION
           * I'm an indie maker with limited resources and funds, I'll really appreciate if you could have a link to my website.
           * The link doesn't need to appear on every pages, one link on one page is enough.
           * For example, in the `About` page. Thank you for your support, it'll mean a lot to me.
           */}
      </AppShellFooter>
    </AppShell>
  );
};
