import { useContributorsStore } from "@/store/contributors-store";
import React, { FC, useState } from "react"
import AppLoadingPlaceholder from "../app-loading-placeholder/app-loading-placeholder";
import { Select } from "radix-ui";
import { useProjectStore } from "@/store/project-store";
import { observer } from "mobx-react-lite";
import styles from "./task-assign-contributor.module.css";
import { Flex } from "@radix-ui/themes";

interface TaskAssignContributorProps {
  taskId: number
}

const TaskAssignContributor: FC<TaskAssignContributorProps> = observer(({
  taskId,
}) => {
  const [selectedContributor, setSelectedContributor] = useState<number>();
  const contributorsStore = useContributorsStore();
  const projectStore = useProjectStore();
  const projectId = projectStore.getId

  const isLoading = contributorsStore.isLoading;
  const contributors = contributorsStore.getContributors;

  const handleOpenSelect = () => {
    if (!contributors || contributors.length === 0) {
      contributorsStore.loadContributors(projectId);
    }
  }

  const handleAssignContributor = (contributorId: string) => {
    setSelectedContributor(Number(contributorId))
    projectStore.assingContributor(taskId, Number(contributorId))
  }

  const selectedContributorLabel = () => {
    if (!selectedContributor) return "Assign contributor";
    const selected = contributors?.find(
      (c) => c.id === selectedContributor
    );
    return selected
      ? `${selected.firstName} ${selected.lastName}`
      : "Assign contributor";
  };

  let content;

  if (contributors && !isLoading) {
    content = contributors.map((contributor) => (
      <Select.Item 
        key={contributor.id} 
        value={String(contributor.id)}
        className={styles.selectItem}
      >
        {contributor.firstName} {contributor.lastName}
      </Select.Item>
    ))

  } else {
    content = <AppLoadingPlaceholder text="loading" />
  }

  return (
    <Select.Root
      value={String(selectedContributor)}
      onValueChange={handleAssignContributor}
      onOpenChange={(isOpen) => {
        if (isOpen) handleOpenSelect();
      }}
    >
      <Flex direction="column" gap="8px">

        <Select.Trigger className={styles.selectTrigger}>
          {selectedContributorLabel()}
        </Select.Trigger>

        <Select.Content className={styles.selectContent}>
          {content}
        </Select.Content>
      </Flex>
    </Select.Root>
  )
});

export default TaskAssignContributor;
