import { DropdownMenu } from "@radix-ui/themes";
import React, { FC } from "react"
import AppButton from "../app-button/app-button";
import { useContributorsStore } from "@/store/contributors-store";
import { RoleNamesEnum } from "@/shared/role-names.enum";

interface AddConributorControlsProps {
  userId: number,
  projectId: number,
  handleResetQuery: () => void
}

const AddConributorControls: FC<AddConributorControlsProps> = ({ 
  userId, 
  projectId,
  handleResetQuery,
}) => {
  const contributorsStore = useContributorsStore()

  const handleAddContributor = (role: RoleNamesEnum) => {
    contributorsStore.addContributor(
      {
        user: { id: userId },
        project: { id: projectId },
        role: role,
      },
      projectId
    )
    handleResetQuery();
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <AppButton size="1" variant="soft">Add</AppButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item
          onClick={() => handleAddContributor(RoleNamesEnum.ProjectManager)}
        >
          Add as Project Manager
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onClick={() => handleAddContributor(RoleNamesEnum.Member)}
        >
          Add as regular Member
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
};

export default AddConributorControls;
