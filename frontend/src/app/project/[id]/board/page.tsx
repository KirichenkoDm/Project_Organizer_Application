"use client";

import BoardMain from "@/components/board-main/board-main";
import { useProjectStore } from "@/store/project-store";
import { Flex } from "@radix-ui/themes";
import { observer } from "mobx-react-lite";
import React from "react";

const BoardPage = observer(() => {
  const project = useProjectStore().project;
  
  return (
    <Flex height="80vh">
      <BoardMain />
    </Flex>
  );
})

export default BoardPage;
