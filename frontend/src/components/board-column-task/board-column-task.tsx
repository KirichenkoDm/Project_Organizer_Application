"use client";

import { Box, Dialog, Flex, IconButton, Separator, Text } from "@radix-ui/themes";
import React, { FC } from "react";
import styles from "./board-column-task.module.css"
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

const cross = <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
</svg>


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
    <Dialog.Root>
      <Dialog.Trigger><Box>
        <BoardColumnTaskCard id={id} name={name} description={description} />
      </Box></Dialog.Trigger>
      <Dialog.Content>
        <Flex width="100%" justify="between" align="center" height="5vh">
          <Dialog.Title>Detailed task info:</Dialog.Title>
          <Dialog.Close>
            <IconButton mb="12px"
              variant="soft"
              color="gray"
            >{cross}</IconButton>
          </Dialog.Close>
        </Flex>
        <Dialog.Description />
        <Separator mb="12px" size="4" />
        <BoardColumnTaskModal
          {...{ id, name, description, blockedBy, blockedByName, assignedId, columnId }}
        />
        {
          start && end
            ? <Flex direction="column" mt="2">
              <Separator size="4" mb="6px" />
              <Text>Time constraints of the task:</Text>
              <Text>{`Start: ${dayjs(start).format("YYYY-MM-DD")}`}</Text>
              <Text>{`End: ${dayjs(end).format("YYYY-MM-DD")}`}</Text>
            </Flex>
            : null
        }
      </Dialog.Content>
    </Dialog.Root>
  );
});

export default BoardColumnTask;