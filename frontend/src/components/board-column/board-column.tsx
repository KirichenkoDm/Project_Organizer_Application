"use client"

import { AlertDialog, Flex, Heading, IconButton } from "@radix-ui/themes";
import React, { FC, Ref, useState } from "react";
import styles from "./board-column.module.css";
import { useProjectStore } from "@/store/project-store";
import { observer } from "mobx-react-lite";
import BoardColumnTask from "../board-column-task/board-column-task";
import { AnimatePresence, LayoutGroup, motion } from "motion/react"
import ColumnReorderControls from "../column-reorder-controls/column-reorder-controls";
import AppButton from "../app-button/app-button";
import ColumnEdit from "../column-edit/column-edit";

const trash = <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
</svg>

const pencil = <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
</svg>

interface BoardColumnProps {
  id: number;
  name: string;
  isCustom: boolean;
  ref?: Ref<HTMLDivElement>;
}

const BoardColumn: FC<BoardColumnProps> = observer(({
  id,
  name,
  isCustom,
  ref
}) => {
  const projectStore = useProjectStore();
  const tasks = projectStore.getTasksByColumnId(id);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleDelete = () => {
    projectStore.deleteColumn(id);
  }

  const columnTitle = <Heading as="h3" className={styles.columnHeading}>{name}</Heading>
  const editButton = <IconButton onClick={() => setIsEditMode(true)}>{pencil}</IconButton>
  const deleteControls =
    <AlertDialog.Root >
      <AlertDialog.Trigger>
        <IconButton mb="10px" color="red" variant="solid">{trash}</IconButton>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="400px">
        <AlertDialog.Title>Delete Column?</AlertDialog.Title>
        <AlertDialog.Description size="2">
          This action cannot be undone. All tasks inside a column will be lost. A you sure?
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <AppButton variant="soft">
              No, Cancel
            </AppButton>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <AppButton
              color="red"
              variant="solid"
              onClick={handleDelete}
            >
              Yes, Delete
            </AppButton>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  let headingContent

  if (isEditMode) {
    headingContent = <ColumnEdit
      id={id}
      name={name}
      setIsEditMode={setIsEditMode}
    />
  } else if (isCustom) {
    headingContent = <>
      <Flex gap="7px" align="baseline">
        {editButton}
        {columnTitle}
        {deleteControls}
      </Flex>
      <ColumnReorderControls id={id} />
    </>
  } else {
    headingContent = columnTitle
  }

  return (
    <Flex
      ref={ref}
      className={styles.boardColumn}
    >
      <Flex justify="between" align="baseline">
        {headingContent}
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