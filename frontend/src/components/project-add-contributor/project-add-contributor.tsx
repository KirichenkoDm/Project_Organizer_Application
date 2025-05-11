import { Box, Flex, IconButton, Popover, Separator, Text } from "@radix-ui/themes";
import React, { FC, useEffect, useState } from "react"
import AppButton from "../app-button/app-button";
import { useUserStore } from "@/store/user-store";
import { GetUser } from "@/shared/types/get-user";
import { useProjectStore } from "@/store/project-store";
import styles from "./project-add-contributot.module.css";
import AddConributorControls from "../project-add-contributor-controls/project-add-contributor-controls";
import { RoleNamesEnum } from "@/shared/role-names.enum";
import { useContributorsStore } from "@/store/contributors-store";

const openIcon = <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.85355 2.14645C3.65829 1.95118 3.34171 1.95118 3.14645 2.14645C2.95118 2.34171 2.95118 2.65829 3.14645 2.85355L7.14645 6.85355C7.34171 7.04882 7.65829 7.04882 7.85355 6.85355L11.8536 2.85355C12.0488 2.65829 12.0488 2.34171 11.8536 2.14645C11.6583 1.95118 11.3417 1.95118 11.1464 2.14645L7.5 5.79289L3.85355 2.14645ZM3.85355 8.14645C3.65829 7.95118 3.34171 7.95118 3.14645 8.14645C2.95118 8.34171 2.95118 8.65829 3.14645 8.85355L7.14645 12.8536C7.34171 13.0488 7.65829 13.0488 7.85355 12.8536L11.8536 8.85355C12.0488 8.65829 12.0488 8.34171 11.8536 8.14645C11.6583 7.95118 11.3417 7.95118 11.1464 8.14645L7.5 11.7929L3.85355 8.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
</svg>

const ProjectAddContributor: FC = () => {
  const [emailQuery, setEmailQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [users, setUsers] = useState<GetUser[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const contributorsStore = useContributorsStore()
  const userStore = useUserStore();
  const projectId = useProjectStore().getId

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailQuery(e.target.value);
  };

  const handleResetQuery = () => {
    setIsOpen(false);
    setEmailQuery("");
    setDebouncedQuery("");
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(emailQuery);
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [emailQuery]);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length <= 3) return;

    const fetch = async () => {
      const users = await userStore.fetchUsersByEmail(debouncedQuery, projectId);
      setUsers(users);
    };

    fetch();
  }, [debouncedQuery]);

  return (
    <Flex mr="15px">
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger>
          <AppButton variant="surface">
            {openIcon}
            Add Contributor
          </AppButton>
        </Popover.Trigger>
        <Popover.Content>
          <Flex direction="column" gap="7px">
            <input
              className={styles.queryImport}
              type="text"
              placeholder="Search by email"
              value={emailQuery}
              onChange={handleInputChange}
            />
            {users.length > 0
              ? users.map(user =>
                <Box key={user.id}>
                  <Separator size="4" color="sky" mb="3" mt="1" />
                  <Flex gap="2" align="center" justify="between">
                    <Flex direction="column">
                      <Text>{`${user.firstName} ${user.lastName}`}</Text>
                      <Text>{`email: ${user.email}`}</Text>
                    </Flex>
                    <AddConributorControls
                      userId={user.id}
                      projectId={projectId}
                      handleResetQuery={handleResetQuery}
                    />
                  </Flex>
                </Box>)
              : <Text>Potential contributor not found</Text>
            }
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </Flex>
  )
};

export default ProjectAddContributor;
