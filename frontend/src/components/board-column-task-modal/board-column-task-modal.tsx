"use client";

import { AlertDialog, Avatar, Flex, Heading, HoverCard, Link, Select, Separator, Text } from "@radix-ui/themes";
import styles from "./board-column-task-modal.module.css"
import React, { FC, useEffect } from "react";
import { useProjectStore } from "@/store/project-store";
import { useUserStore } from "@/store/user-store";
import { observer } from "mobx-react-lite";
import TaskAssignContributor from "../task-assign-contributor/task-assign-contributor";
import AppButton from "../app-button/app-button";
import TaskModalInfo from "../task-modal-info/task-modal-info";
interface BoardColumnTaskCardProps {
  id: number;
  name: string;
  description: string;
  blockedBy?: number;
  blockedByName?: string;
  assignedId?: number;
  columnId: number;
}

const BoardColumnTaskModal: FC<BoardColumnTaskCardProps> = observer(({
  id,
  name,
  description,
  blockedBy,
  blockedByName,
  assignedId,
  columnId
}) => {
  const userStore = useUserStore();
  const projectStore = useProjectStore();
  let assigned = userStore.getAssigned;

  const columns = projectStore.getColumns;

  const handleChangeColumn = (value: string) => {
    projectStore.changeTaskState(id, Number(value))
  }

  const handleUnblock = () => {
    projectStore.unblockTask(id);
  }

  const handleDelete = () => {
    projectStore.deleteTask(id);
  }

  useEffect(() => {
    if (assignedId) {
      userStore.fetchAssigned(assignedId);
    } else {
      userStore.setAssigned(undefined);
    }
  }, [])

  return (
    <Flex className={styles.taskModalContainer}>
      <TaskModalInfo
        {...{
          id,
          name,
          description,
          blockedBy,
          blockedByName
        }}
      />
      <Separator orientation="vertical" size="4" mx="15px" />
      <Flex className={styles.taskControls}>
        <Flex direction="column" gap="5px">
          {
            assigned
              ? <HoverCard.Root>
                <HoverCard.Trigger><Flex justify="center">
                  <Link><Avatar fallback={`${assigned.firstName[0]}${assigned.lastName[0]}`} /></Link>
                </Flex></HoverCard.Trigger>
                <HoverCard.Content>
                  <Flex direction="column">
                    <Text>Assinged contributor:</Text>
                    <Text>{`${assigned.firstName} ${assigned.lastName}`}</Text>
                    <Text>{`email: ${assigned.email}`}</Text>
                  </Flex>
                </HoverCard.Content>
              </HoverCard.Root>

              : <TaskAssignContributor taskId={id} />
          }
          {
            blockedBy
              ? <AppButton
                variant="surface"
                color="red"
                onClick={handleUnblock}
              >
                Remove block
              </AppButton>
              : <><Text>Change state:</Text>
                <Select.Root value={`${columnId}`} onValueChange={handleChangeColumn}>
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Group>
                      {columns.map(col =>
                        <Select.Item
                          value={`${col.id}`}
                          key={col.id}
                        >{col.name}
                        </Select.Item>
                      )
                      }
                    </Select.Group>
                  </Select.Content>
                </Select.Root></>
          }
        </Flex>

        <AlertDialog.Root >
          <AlertDialog.Trigger>
            <AppButton mb="10px" color="red" variant="solid">Delete</AppButton>
          </AlertDialog.Trigger>

          <AlertDialog.Content maxWidth="400px">
            <AlertDialog.Title>Delete task?</AlertDialog.Title>

            <AlertDialog.Description size="2">
              This action cannot be undone. A you sure?
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
      </Flex>
    </Flex>
  );
})
export default BoardColumnTaskModal;