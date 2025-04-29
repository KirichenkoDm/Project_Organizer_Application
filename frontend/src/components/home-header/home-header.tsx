"use client";

import { useUserStore } from '@/store/root-provider'
import React, { FC } from 'react'
import styles from "./home-header.module.css"
import { Avatar } from 'radix-ui';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';

const HomeHeader: FC = observer(() => {
  const userStore = useUserStore();
  const user = userStore.user!;

  const displayName = user.firstName + " " + user.lastName;
  const avatarFallback = user.firstName[0] + user.lastName[0];

  return (
    <header className={styles.homeHeader}>
      <h1 className={styles.logo}>Project Organizer APP</h1>
      <Link href="/profile" className={styles.userBadge}>
        <span className={styles.userName}>{displayName}</span>
        <Avatar.Root className={styles.avatar}>
          <Avatar.Fallback>
            {avatarFallback}
          </Avatar.Fallback>
        </Avatar.Root>
      </Link>
    </header>
  )
})

export default HomeHeader;
