"use client"

import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import styles from "./home-projects-list.module.css";
import { ScrollArea } from "radix-ui";
import HomeProjectListItem from "../home-project-list-item/home-project-list-item";
import EmptyList from "./empty-list";
import { useHomeProjectsStore } from "@/store/home-projects-store";
import { useUserStore } from "@/store/user-store";
import { Box } from "@radix-ui/themes";


const HomeProjectsList: FC = observer(() => {
  const { homeProjects, getHomeProjects } = useHomeProjectsStore()
  const { user } = useUserStore()

  useEffect(() => {
    getHomeProjects(user!.id)
  }, []);

  let content;

  if (!homeProjects || homeProjects.length === 0) {
    content = <EmptyList />
  } else {
    content =
      <Box className={styles.projectsListContainer}>
        <ScrollArea.Root className={styles.projectsList}>
          <ScrollArea.Viewport className={styles.projectsListViewport}>
            {homeProjects.map((project) =>
              <HomeProjectListItem
                id={project.id}
                name={project.name}
                theme={project.theme}
                description={project.description}
                key={project.id}
              />
            )}
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar className={styles.ScrollAreaScrollbar}>
            <ScrollArea.Thumb className={styles.ScrollAreaThumb} />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </Box>
  }



  return content
})

export default HomeProjectsList;