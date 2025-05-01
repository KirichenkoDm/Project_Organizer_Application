"use client";
import HomeHeader from "@/components/home-header/home-header";
import HomeProjectsList from "@/components/home-projects-list/home-projects-list";
import { Box, Flex, Heading, Section } from "@radix-ui/themes";
import React from "react";
import styles from "./home.module.css";
import HomeProjectListHeading from "@/components/home-project-list-heading/home-project-list-heading";

const HomePage = () => {
  return (
    <Flex className={styles.homePageContainer}>
      <HomeHeader />
      <Section className={styles.mainBox}>
        <HomeProjectListHeading />
        <HomeProjectsList />
      </Section>
    </Flex>
    
  );
}

export default HomePage;
