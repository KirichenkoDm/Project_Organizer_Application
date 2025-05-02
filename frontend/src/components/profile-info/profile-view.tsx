"use client"

import { UserInstance } from "@/store/models/user";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import React, { FC } from "react";
import styles from "./profile-info.module.css"
import AppButton from "../app-button/app-button";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "next/navigation";

interface ProfileViewProps {
  user: UserInstance
}

const ProfileView: FC<ProfileViewProps> = ({ user }) => {
  const userStore = useUserStore();
  const router = useRouter();
  
  const handleLogOut = () => {
    router.replace("/auth");
    userStore.setUser(null);
  }

  return (
    <Flex direction="column" align="end" gap="2">
      <Box p="4" className={styles.profileViewContainer}>
        <Flex direction="column" gap="3">

          <Flex gap="2">
            <Text weight="bold">First Name:</Text>
            <Text>{user.firstName}</Text>
          </Flex>

          <Flex gap="2">
            <Text weight="bold">Last Name:</Text>
            <Text>{user.lastName}</Text>
          </Flex>

          <Flex gap="2">
            <Text weight="bold">Email:</Text>
            <Text>{user.email}</Text>
          </Flex>
        </Flex>
      </Box>
      <AppButton onClick={handleLogOut}>
        Log out
      </AppButton>
    </Flex>

  );
}

export default ProfileView;
