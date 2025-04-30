"use client"

import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import styles from "./home-projects-list.module.css";
import { ScrollArea } from "radix-ui";
import HomeProjectListItem from "../home-project-list-item/home-project-list-item";
import { Project } from "@/shared/types/project";
import { fetchProjects } from "./fetsh-projects";


const HomeProjectsList: FC = observer(() => {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects(setProjects, setLoading);
  }, []);

  if (loading) {
    return <div className={styles.emptyState}><p>Loading in projects...</p></div>;
  }

  if (!projects || projects.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>You don't have any projects yet. Create your first project to get started!</p>
      </div>
    );
  }

  return (
    <div className={styles.projectsListContainer}>
      <ScrollArea.Root className={styles.projectsList}>
        <ScrollArea.Viewport className={styles.projectsListViewport}>
          {projects.map((project) =>
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
          <ScrollArea.Thumb className={styles.ScrollAreaThumb}/>
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
})

export default HomeProjectsList;