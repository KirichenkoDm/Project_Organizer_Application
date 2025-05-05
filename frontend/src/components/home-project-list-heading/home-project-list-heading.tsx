import { Button, Flex, Heading, Dialog } from "@radix-ui/themes";
import React, { FC } from "react";
import styles from "./home-project-list-heading.module.css"
import ProjectCreationForm from "../project-creation-form/project-creation-form";

const HomeProjectListHeading: FC = () => {
  return (
    <Flex className={styles.homeListItemHeading}>
      <Heading as="h2">Your projects</Heading>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button variant="solid">Create new project</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="400px">
          <Flex direction="column" align="center">
            <Dialog.Title>Input new project data</Dialog.Title>
            <ProjectCreationForm />
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Flex>

  )
}

export default HomeProjectListHeading;
