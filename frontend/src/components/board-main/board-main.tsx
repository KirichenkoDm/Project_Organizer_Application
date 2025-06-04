import { Flex } from "@radix-ui/themes";
import React, { FC } from "react"
import BoardColumn from "../board-column/board-column";
import styles from "./board-main.module.css";
import { useProjectStore } from "@/store/project-store";
import { observer } from "mobx-react-lite";
import { AnimatePresence, LayoutGroup, motion } from "motion/react"

const BoardMain: FC = observer(() => {
  const projectStore = useProjectStore()
  const columns = projectStore.getColumns;

  return (
    <Flex
      justify="start"
      className={styles.boardMain}
    >
      <LayoutGroup id="board">
        <AnimatePresence>
          {columns.map((column) => (
            <BoardColumn
              {...column}
              key={column.id}
              id={column.id}

              layout
              transition={{ duration: 0.3 }}
            />
          ))}
        </AnimatePresence>
      </LayoutGroup>
    </Flex >
  );
});

export default BoardMain;