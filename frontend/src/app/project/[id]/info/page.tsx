"use client";
import AppLoadingPlaceholder from "@/components/app-loading-placeholder/app-loading-placeholder";
import ProjectInfo from "@/components/project-info/project-info";
import { useProjectStore } from "@/store/project-store";
import { Flex } from "@radix-ui/themes";
import { observer } from "mobx-react-lite";
import React from "react";

const ProjectInfoPage = observer(() => {
  const project = useProjectStore().getProject;
  const title = `Info: ${project?.name}`;

  if (!project) {
    return (<AppLoadingPlaceholder
      text="Project is loading. It will appear in a moment..."
    />)
  }

  return (<>
    <title>{title}</title>
    <Flex height="80vh" justify="center" align="center">
      <ProjectInfo />
    </Flex>
  </>);
})
export default ProjectInfoPage;
