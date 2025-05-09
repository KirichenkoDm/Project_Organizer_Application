"use client";

import { Avatar, Box, Dialog, Flex, Heading, HoverCard, Link, Select, Separator, Text } from "@radix-ui/themes";
import React, { FC, useEffect } from "react";
import styles from "./board-column-task.module.css"
import { useProjectStore } from "@/store/project-store";
import { useUserStore } from "@/store/user-store";
import { observer } from "mobx-react-lite";
import dayjs from "dayjs"
import BoardColumnTaskCard from "../board-column-task-card/board-column-task-card";
import BoardColumnTaskModal from "../board-column-task-modal/board-column-task-modal";
interface BoardColumnTaskCardProps {
  id: number
  name: string;
  description: string;
  order: number;
  blockedBy?: number;
  blockedByName?: string;
  assignedId?: number;
  start?: Date;
  end?: Date;

  columnId: number;
}

const BoardColumnTask: FC<BoardColumnTaskCardProps> = observer(({
  id,
  name,
  description,
  order,
  blockedBy,
  blockedByName,
  assignedId,
  start,
  end,
  columnId,
}) => {
  return (
    <><Dialog.Root>
        <Dialog.Trigger><Box>
          <BoardColumnTaskCard name={name} description={description}/>
        </Box></Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title as="h6">Detailed task info:</Dialog.Title>
        <Dialog.Description />
        <Separator my="3" size="4" />
        <BoardColumnTaskModal 
          {...{name, description, blockedBy, blockedByName, assignedId, columnId}}
        />
        {
          start && end
            ? <Flex direction="column" mt="2">
              <Text>Time constraints of the task:</Text>
              <Text>{`Start: ${dayjs(start).format("YYYY-MM-DD")}`}</Text>
              <Text>{`End: ${dayjs(end).format("YYYY-MM-DD")}`}</Text>
            </Flex>
            : null
        }
      </Dialog.Content>
    </Dialog.Root></>
  );
});

export default BoardColumnTask;