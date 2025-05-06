"use client";

import { AlertDialog, Flex } from "@radix-ui/themes";
import React, { FC } from "react";
import AppButton from "../app-button/app-button";

interface InfoControlsProps {
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>
  deleteAction: () => Promise<void>
  deleteTarget: "User" | "Project"
}

const InfoControls: FC<InfoControlsProps> = ({
  setIsEditMode,
  deleteAction,
  deleteTarget
}) => (
  <Flex justify="end" gap="2">
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <AppButton color="red" variant="solid">Delete</AppButton>
      </AlertDialog.Trigger>

      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Delete {deleteTarget}?</AlertDialog.Title>

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
              onClick={() => deleteAction()}
            >
              Yes, Delete
            </AppButton>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
    <AppButton variant="solid" onClick={() => setIsEditMode(true)}>Edit</AppButton>
  </Flex>
)

export default InfoControls;
