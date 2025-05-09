"use client";

import HomeProjectsList from "@/components/home-projects-list/home-projects-list";
import { Flex, Section } from "@radix-ui/themes";
import React from "react";
import styles from "./home.module.css";
import HomeProjectListHeading from "@/components/home-project-list-heading/home-project-list-heading";
import AppHeader from "@/components/app-header/app-header";
import { useUserStore } from "@/store/user-store";
import AppLoadingPlaceholder from "@/components/app-loading-placeholder/app-loading-placeholder";
import { observer } from "mobx-react-lite";

const HomeContent = observer(() => {
  const isAuthenticated = useUserStore().isAuthenticated;

  if(!isAuthenticated) {
    return (<AppLoadingPlaceholder
      text="Application is loading. You will be redirected in a moment..."
    />)
  }

  return (
    <Flex className={styles.homePageContainer}>
      <AppHeader />
      <Section className={styles.mainBox}>
        <HomeProjectListHeading />
        <HomeProjectsList />
      </Section>
    </Flex>
  );
});

export default HomeContent;
