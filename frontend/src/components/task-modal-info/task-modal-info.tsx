import React, { FC, useState } from "react"
import { Flex, Heading, Separator, Text } from "@radix-ui/themes";
import TaskModalEdit from "../task-modal-edit/task-modal-edit";
import styles from "./task-modal-info.module.css";
import AppButton from "../app-button/app-button";
import { observer } from "mobx-react-lite";

interface TaskModalInfoProps {
  id: number,
  name: string,
  description: string,
  blockedBy?: number,
  blockedByName?: string
}

const TaskModalInfo: FC<TaskModalInfoProps> = ({
  id,
  name,
  description,
  blockedBy,
  blockedByName
}) => {
  const [isEditMode, setIsEditMode] = useState(false)

  let content;

  if (isEditMode) {
    content = <TaskModalEdit
      setIsEditMode={setIsEditMode}
      name={name}
      description={description}
      blockedBy={blockedBy}
      taskId={id}
    />;
  } else {
    content =
      <Flex direction="column" className={styles.taskModalInfo}>
        <Text className={styles.infoName}>{name}</Text>
        <Separator size="4" />
        <Text className={styles.infoDescription}>{description}</Text>
        <Separator size="4" />
        {
          blockedBy
            ? <Text className={styles.blockedText}>Task is bloked by: {blockedByName}</Text>
            : <Text className={styles.notBlockedText}>Task is not bloked</Text>
        }
      </Flex>
  }

  return (
    <Flex justify="between" width="100%">
      {content}
      {
        !isEditMode
          ? <AppButton onClick={() => setIsEditMode(true)} variant="soft">Edit</AppButton>
          : null
      }
    </Flex>
  )
};

export default TaskModalInfo;
