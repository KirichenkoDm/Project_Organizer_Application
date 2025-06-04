"use client"

import { Box, Flex, Text } from "@radix-ui/themes";
import React, { FC } from "react";
import styles from "./project-info.module.css"
import { EditProject } from "@/shared/types/edit-project";

interface ProjectViewProps {
  project: EditProject
}

const ProjectView: FC<ProjectViewProps> = ({ project }) => {
  return (
    <Flex direction="column" align="end" gap="2">
      <Box p="4" className={styles.projectViewContainer}>
        <Flex direction="column" gap="3">

          <Flex gap="2">
            <Text weight="bold">Project Name:</Text>
            <Text>{project.name}</Text>
          </Flex>

          <Flex gap="2">
            <Text weight="bold">Project Theme:</Text>
            <Text>{project.theme}</Text>
          </Flex>

          <Flex gap="2">
            <Text weight="bold">Description:</Text>
            <Text>{project.description}</Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>

  );
}

export default ProjectView;
