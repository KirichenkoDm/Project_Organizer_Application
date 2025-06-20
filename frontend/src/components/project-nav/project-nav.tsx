"use client";

import { Flex, Heading, Separator, TabNav } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react"
import styles from "./project-nav.module.css"
import AppButton from "../app-button/app-button";
import ProjectCreateTask from "../project-create-task/project-create-task";
import ProjectCreateColumn from "../project-create-column/project-create-column";
import ProjectAddContributor from "../project-add-contributor/project-add-contributor";
import { useUserStore } from "@/store/user-store";

interface ProjectNav {
  projectId: number;
  projectName: string;
}

const ProjectNav: FC<ProjectNav> = ({ projectId, projectName }) => {
  const rolePriority = useUserStore().getRolePriority
  const pathname = usePathname();
  const baseUrl = `/project/${projectId}`

  return (
    <TabNav.Root
      size="2"
    >
      <Flex justify="between" width="100%">
        <Flex align="center" >
          <Heading as="h3" className={styles.projectName}>{projectName}</Heading>
          <Separator orientation="vertical" size="2" mr="5px" />
          <TabNav.Link asChild active={pathname === `${baseUrl}/board`} className={styles.tabNav}>
            <Link href={`${baseUrl}/board`}>Board</Link>
          </TabNav.Link>
          <Separator orientation="vertical" size="1" />
          <TabNav.Link asChild active={pathname === `${baseUrl}/info`} className={styles.tabNav}>
            <Link href={`${baseUrl}/info`}>Info</Link>
          </TabNav.Link>
        </Flex>
        <Flex align="center" mr="28px" gap="10px">
          {
            rolePriority >= 1
              ? <>
                <ProjectAddContributor />
                <ProjectCreateColumn />
              </>
              : null
          }
          <ProjectCreateTask />
        </Flex>
      </Flex>
    </TabNav.Root>
  )
}

export default ProjectNav;
