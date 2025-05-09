"use client"

import { ProjectThemeEnum } from "@/shared/project-theme.enum";
import Link from "next/link";
import React, { FC } from "react";
import styles from "./home-project-list-item.module.css";
import { Card, Heading, Text } from "@radix-ui/themes";
import { useProjectStore } from "@/store/project-store";
import { Project } from "@/store/models/project";
import { useUserStore } from "@/store/user-store";

interface HomeProjectListItemProps {
  id: number;
  name: string;
  theme: ProjectThemeEnum;
  description: string;
}

const HomeProjectListItem: FC<HomeProjectListItemProps> = ({
  id,
  name,
  theme,
  description 
}) => {
  const projectStore = useProjectStore();
  const userStore = useUserStore()
  const handleOpenProject = () => {
    projectStore.setProject(Project.create({
      id, name, theme, description
    }));
    userStore.fetchRole(id);
  }

  return (
    <Link 
      href={`/project/${id}/board`} 
      className={styles.projectCardLink}
      onClick={handleOpenProject}
    >
      <Card className={styles.projectCard}>
        <Heading as="h3" className={styles.projectName}>{name}</Heading>
        <Text>{theme}</Text>
        <Text as="p" className={styles.projectDescription}>{description}</Text>
      </Card>
    </Link>
  );
};

export default HomeProjectListItem;