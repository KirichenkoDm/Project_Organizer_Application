import { Flex, Heading } from "@radix-ui/themes";
import React, { FC } from "react";
import styles from "./board-column.module.css";
import BoardColumnTaskCard from "../board-column-task-card/board-column-task-card";
import { useProjectStore } from "@/store/project-store";
import { observer } from "mobx-react-lite";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
  // const projectStore = useProjectStore();
  // const tasks = projectStore.getTasksByColumnId(id);
  console.log(id);
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
      className={styles.boardColumn}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
    >
      <Flex justify="between">
        <Heading as="h3">{name}</Heading>
        {
          isCustom
            ? <Heading as="h1">::</Heading>
            : null
        }
      </Flex>
       {/*
      <Flex direction="column" flexGrow="1" gap="15px">
        <DndContext 
          id="tasts"
        >
          <SortableContext items={tasks}>
            {
              tasks.map(task =>
                <BoardColumnTaskCard {...task} key={task.id} id={task.id}/>
              )
            }
          </SortableContext>
        </DndContext>
      </Flex> */}
    </Flex>
  );
})
export default BoardColumn;