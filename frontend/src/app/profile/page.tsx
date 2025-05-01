import ProfileInfo from "@/components/profile-info/profile-info";
import { Box, Flex, Heading } from "@radix-ui/themes";
import React, { FC } from "react";
import styles from "./prifile.module.css"
import AppLogo from "@/components/app-logo/app-logo";

const ProfilePage: FC = () => {
  return (
    <Box className={styles.profilePageContainer}>
      <AppLogo />
      <Flex direction="column" gap="5" className={styles.profileContainer}>
        <Heading as="h2">Your info:</Heading>
        <ProfileInfo />
      </Flex>
    </Box>
  );
}

export default ProfilePage;
