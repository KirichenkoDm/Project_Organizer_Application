"use client";

import { Flex, Heading, Text } from "@radix-ui/themes";
import React, { FC, forwardRef } from "react";
import styles from "./board-column-task-card.module.css"
import TaskReorderControls from "../task-reorder-controls/task-reorder-controls";

interface BoardColumnTaskCardProps {
  id: number
  name: string;
  description: string;
}

const BoardColumnTaskCard: FC<BoardColumnTaskCardProps> = ({
  id,
  name,
  description,
}) => {

  return (
    <Flex
      className={styles.taskCard}
    >
      <Flex className={styles.taskText}>
        <Heading as="h6">{name}</Heading>
        <Text>{description}</Text>
      </Flex>
      <TaskReorderControls id={id}/>
    </Flex>
  );
}
export default BoardColumnTaskCard;