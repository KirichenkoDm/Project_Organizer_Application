"use client"

import ProfileInfo from "@/components/profile-info/profile-info";
import { Box, Flex, Heading } from "@radix-ui/themes";
import React, { FC } from "react";
import styles from "./profile.module.css"
import AppHeader from "@/components/app-header/app-header";
import { useUserStore } from "@/store/user-store";
import AppLoadingPlaceholder from "@/components/app-loading-placeholder/app-loading-placeholder";
import { observer } from "mobx-react-lite";
import Head from "next/head";

const ProfilePage: FC = observer(() => {
  const isAuthenticated = useUserStore().isAuthenticated;

  if(!isAuthenticated) {
    return (<AppLoadingPlaceholder
      text="Application is loading. You will be redirected in a moment..."
    />)
  }

  return (<>
    <Head>
      <title>My Profile</title>
    </Head>
    <Box className={styles.profilePageContainer}>
      <AppHeader />
      <Flex direction="column" gap="5" className={styles.profileContainer}>
        <Heading as="h2">Your info:</Heading>
        <ProfileInfo />
      </Flex>
    </Box>
  </>);
})

export default ProfilePage;
