"use client";

import React, { FC } from 'react'
import styles from "./app-user-badge.module.css"
import { useUserStore } from '@/store/user-store';
import { Avatar, DropdownMenu, Flex, Separator, Text } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

const AppUserBadge: FC = () => {
  const router = useRouter()
  const userStore = useUserStore();
  const user = userStore.user;

  if(!user) {
    return (null);
  }

  const displayName = `${user.firstName} ${user.lastName}`;
  const avatarFallback = `${user.firstName[0]}${user.lastName[0]}`;

  const handleShowProfile = () => {
    router.push("/profile")
  }

  const handleLogOut = () => {
    userStore.logout();
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Flex className={styles.userBadge}>
          <Text className={styles.userName}>{displayName}</Text>
          <Avatar 
            fallback = {avatarFallback}
            className={styles.avatar} 
          />
        </Flex>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <Flex direction="column" gap="5px" minWidth="130px">
          <DropdownMenu.Item onClick={handleShowProfile}>Show profile</DropdownMenu.Item>
          <Separator orientation="horizontal" size="4"/>
          <DropdownMenu.Item onClick={handleLogOut}>Log Out</DropdownMenu.Item>
        </Flex>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default AppUserBadge;