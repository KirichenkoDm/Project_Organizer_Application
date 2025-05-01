"use client";

import React, { FC } from 'react'
import styles from "./home-header.module.css"
import { Avatar } from 'radix-ui';
import Link from 'next/link';
import { useUserStore } from '@/store/user-store';
import { Box, Heading, Text } from '@radix-ui/themes';
import AppLogo from '../app-logo/app-logo';

const HomeHeader: FC = () => {
  const userStore = useUserStore();
  const user = userStore.user!;

  const displayName = `${user.firstName} ${user.lastName}`;
  const avatarFallback = `${user.firstName[0]}${user.lastName[0]}`;

  return (
    <Box className={styles.homeHeadercContaner}>
      <header className={styles.homeHeader}>
        <AppLogo />
        <Link href="/profile" className={styles.userBadge}>
          <Text className={styles.userName}>{displayName}</Text>
          <Avatar.Root className={styles.avatar}>
            <Avatar.Fallback>
              {avatarFallback}
            </Avatar.Fallback>
          </Avatar.Root>
        </Link>
      </header>
    </Box>
  )
}

export default HomeHeader;
