"use client";

import { Flex, Heading, Text } from "@radix-ui/themes";
import React, { FC, forwardRef } from "react";
import styles from "./board-column-task-card.module.css"

interface BoardColumnTaskCardProps {
  name: string;
  description: string;
}

const BoardColumnTaskCard: FC<BoardColumnTaskCardProps> = ({
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
      <Heading as="h1">::</Heading>
    </Flex>
  );
}
export default BoardColumnTaskCard;