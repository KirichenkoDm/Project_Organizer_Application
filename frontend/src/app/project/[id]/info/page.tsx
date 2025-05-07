"use client";
import ProjectInfo from "@/components/project-info/project-info";
import { Flex } from "@radix-ui/themes";
import React from "react";

const ProjectInfoPage = () => {
  return (
    <Flex height="80vh" justify="center" align="center">
      <ProjectInfo />
    </Flex>
  );
}

export default ProjectInfoPage;
