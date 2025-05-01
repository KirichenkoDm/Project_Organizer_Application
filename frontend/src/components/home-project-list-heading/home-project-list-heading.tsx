import { Button, Flex, Heading, Dialog } from "@radix-ui/themes";
import React, { FC } from "react";
import styles from "./home-project-list-heading.module.css"

const HomeProjectListHeading: FC = () => {
  return (
    <Flex className={styles.homeListItemHeading}>
      <Heading as="h2">Your projects</Heading>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button variant="solid">Create new project</Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Title>Input new project data</Dialog.Title>
          <Dialog.Description>
            You will become owner of new project after creation
          </Dialog.Description>

          <div>here will be form</div>

          <Dialog.Close>
            <Button variant="soft" color="red">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </Flex>

  )
}

export default HomeProjectListHeading;
