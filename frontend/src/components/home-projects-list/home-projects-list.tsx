"use client"

import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import styles from "./home-projects-list.module.css";
import HomeProjectListItem from "../home-project-list-item/home-project-list-item";
import EmptyList from "./empty-list";
import { useHomeProjectsStore } from "@/store/home-projects-store";
import { useUserStore } from "@/store/user-store";
import { Box, ScrollArea } from "@radix-ui/themes";


const HomeProjectsList: FC = observer(() => {
  const { homeProjects, fetchHomeProjects } = useHomeProjectsStore()
  const { user } = useUserStore()

  useEffect(() => {
    fetchHomeProjects(user!.id)
  }, []);

  let content;

  if (!homeProjects || homeProjects.length === 0) {
    content = <EmptyList />
  } else {
    content =
      <Box className={styles.projectsListContainer}>
        <ScrollArea className={styles.projectsList}>
          <Box className={styles.projectsListBox}>
            {homeProjects.map((project) => (
              <HomeProjectListItem
                id={project.id}
                name={project.name}
                theme={project.theme}
                description={project.description}
                key={project.id}
              />
            ))}
          </Box>
        </ScrollArea>
      </Box>
  }



  return content
})

export default HomeProjectsList;