import { Dialog, Flex } from "@radix-ui/themes";
import React, { FC } from "react";
import AppButton from "../app-button/app-button";
import TaskCreationForm from "../task-creation-form/task-creation-form";

const ProjectCreateTask: FC = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <AppButton>Add task</AppButton>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="400px">
        <Dialog.Description></Dialog.Description>
        <Flex direction="column" align="center">
          <Dialog.Title>Input new task data</Dialog.Title>
          <TaskCreationForm />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default ProjectCreateTask;