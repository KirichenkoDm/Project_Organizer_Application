"use client";

import AppLoadingPlaceholder from "@/components/app-loading-placeholder/app-loading-placeholder";
import BoardMain from "@/components/board-main/board-main";
import { useProjectStore } from "@/store/project-store";
import { Flex } from "@radix-ui/themes";
import { observer } from "mobx-react-lite";
import React from "react";

const BoardPage = observer(() => {
  const project = useProjectStore().getProject;
  const title = `Board: ${project?.name}`;

  if (!project) {
    return (<AppLoadingPlaceholder
      text="Project is loading. It will appear in a moment..."
    />)
  }

  return (<>
    <title>{title}</title>
    <Flex height="80vh">
      <BoardMain />
    </Flex>
  </>);
})

export default BoardPage;
