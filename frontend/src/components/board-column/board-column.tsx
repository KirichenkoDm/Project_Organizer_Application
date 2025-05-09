import { Flex, Heading } from "@radix-ui/themes";
import React, { FC } from "react";
import styles from "./board-column.module.css";
import { useProjectStore } from "@/store/project-store";
import { observer } from "mobx-react-lite";
import BoardColumnTask from "../board-column-task/board-column-task";

interface BoardColumnProps {
  id: number;
  name: string;
  order: number;
  isCustom: boolean;
}

const BoardColumn: FC<BoardColumnProps> = observer(({
  id,
  name,
  order,
  isCustom,
}) => {
  const projectStore = useProjectStore();
  const tasks = projectStore.getTasksByColumnId(id);

  return (
    <Flex
      className={styles.boardColumn}
    >
      <Flex justify="between">
        <Heading as="h3">{name}</Heading>
        {
          isCustom
            ? <Heading as="h1">::</Heading>
            : null
        }
      </Flex>

      <Flex direction="column" gap="15px" overflowY="auto" overflowX="hidden" p="10px">
        {
          tasks.map(task =>
            <BoardColumnTask
              {...task} 
              columnId={id}
              key={task.id} 

              id={task.id}
            />
          )
        }
      </Flex>
    </Flex>
  );
})
export default BoardColumn;