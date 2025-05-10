"use client"

import { Flex, Heading } from "@radix-ui/themes";
import React, { FC, Ref } from "react";
import styles from "./board-column.module.css";
import { useProjectStore } from "@/store/project-store";
import { observer } from "mobx-react-lite";
import BoardColumnTask from "../board-column-task/board-column-task";
import { AnimatePresence, LayoutGroup, motion } from "motion/react"
import ColumnReorderControls from "../column-reorder-controls/column-reorder-controls";

interface BoardColumnProps {
  id: number;
  name: string;
  order: number;
  isCustom: boolean;
  ref?: Ref<HTMLDivElement>;
}

const BoardColumn: FC<BoardColumnProps> = observer(({
  id,
  name,
  order,
  isCustom,
  ref
}) => {
  const projectStore = useProjectStore();
  const tasks = projectStore.getTasksByColumnId(id);

  return (
    <Flex
      ref = {ref}
      className={styles.boardColumn}
    >
      <Flex justify="between" >
        <Heading as="h3">{name}</Heading>
        {
          isCustom
            ? <ColumnReorderControls id={id} />
            : null
        }
      </Flex>

      <Flex direction="column" gap="15px" overflowY="auto" overflowX="hidden" p="10px">

        <AnimatePresence>
          {tasks.map(task => (
            <LayoutGroup id={`column-${id}`} key={task.id}>
              <motion.div
                key={task.id}
                layout
                transition={{ duration: 0.2 }}
              >
                <BoardColumnTask
                  {...task}
                  columnId={id}
                  key={task.id}
                />
              </motion.div>
            </LayoutGroup>
          ))}
        </AnimatePresence>
      </Flex>
    </Flex>
  );
})

export default motion.create(BoardColumn, { forwardMotionProps: true });;