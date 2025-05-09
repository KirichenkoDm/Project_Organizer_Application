"use client";

import { Avatar, Flex, Heading, HoverCard, Link, Select, Text } from "@radix-ui/themes";
import styles from "./board-column-task-modal.module.css"
import React, { FC, useEffect } from "react";
import { useProjectStore } from "@/store/project-store";
import { useUserStore } from "@/store/user-store";
import { observer } from "mobx-react-lite";
interface BoardColumnTaskCardProps {
  name: string;
  description: string;
  blockedBy?: number;
  blockedByName?: string;
  assignedId?: number;
  columnId: number;
}

const BoardColumnTaskModal: FC<BoardColumnTaskCardProps> = observer(({
  name,
  description,
  blockedBy,
  blockedByName,
  assignedId,
  columnId
}) => {
  const userStore = useUserStore();
  let assigned = userStore.getAssigned;

  const columns = useProjectStore().getColumns;

  const handleChangeColumn = () => {

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
      <Flex className={styles.taskInfoDetailed}>
        <Heading>{name}</Heading>
        <Text>{description}</Text>
        {
          blockedBy
            ? <Text>Task is bloked by: {blockedByName}</Text>
            : null
        }
      </Flex>
      <Flex className={styles.taskControls}>
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
            : null
        }
        {
          blockedBy
            ? null
            : <><Text>Change column:</Text>
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
    </Flex>
  );
})
export default BoardColumnTaskModal;