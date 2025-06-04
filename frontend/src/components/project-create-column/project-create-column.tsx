import { Dialog, Flex } from "@radix-ui/themes";
import React, { FC } from "react";
import AppButton from "../app-button/app-button";
import ColumnCreationForm from "../column-creation-form/column-creation-form";

const ProjectCreateColumn: FC = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <AppButton>Add column</AppButton>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="400px">
        <Dialog.Description></Dialog.Description>
        <Flex direction="column" align="center">
          <Dialog.Title>Input new column name:</Dialog.Title>
          <ColumnCreationForm />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default ProjectCreateColumn;