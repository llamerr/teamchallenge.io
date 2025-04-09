import type { BadgeProps as MantineBadgeProps } from '@mantine/core';
import type { UrlObject } from 'node:url';
import { Badge as MantineBadge } from '@mantine/core';
import Link from 'next/link';

import styles from './styles.module.css';

type BadgeProps = MantineBadgeProps & {
  href?: string | UrlObject;
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  href,
  ...props
}) => {
  if (href) {
    return (
      <MantineBadge
        className={styles.badge}
        component={Link}
        href={href}
        {...props}
      >
        {children}
      </MantineBadge>
    );
  }

  return (
    <MantineBadge
      className={styles.badge}
      {...props}
    >
      {children}
    </MantineBadge>
  );
};
