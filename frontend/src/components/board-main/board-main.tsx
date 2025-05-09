import { Flex } from "@radix-ui/themes";
import React, { FC } from "react"
import BoardColumn from "../board-column/board-column";
import styles from "./board-main.module.css";
import { useProjectStore } from "@/store/project-store";
import { observer } from "mobx-react-lite";

const BoardMain: FC = observer(() => {
  const projectStore = useProjectStore()
  const columns = projectStore.getColumns;

  return (
    <Flex
      justify="start"
      className={styles.boardMain}
    >
      {columns.map((column) => {
        return <BoardColumn {...column} key={column.id} id={column.id} />
      })}
    </Flex >
  );
})
export default BoardMain;