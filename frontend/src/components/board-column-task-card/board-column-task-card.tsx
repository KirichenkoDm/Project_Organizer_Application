"use client";

import { Flex, Heading, Text } from "@radix-ui/themes";
import React, { FC } from "react";
import styles from "./board-column-task-card.module.css"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
}

const BoardColumnTaskCard: FC<BoardColumnTaskCardProps> = ({
  id,
  name,
  description,
  order,
  blockedBy,
  blockedByName,
  assignedId,
  start,
  end,
}) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };


  return (
    <Flex
      className={styles.taskCard}
      // ref={setNodeRef}
      // {...attributes}
      // {...listeners}
      // style={style}
    >
      <Flex className={styles.taskText}>
        <Heading as="h6">{name}</Heading>
        <Text>{description}</Text>
      </Flex>
      <Heading as="h1">::</Heading>
    </Flex>

  );
}
export default BoardColumnTaskCard;