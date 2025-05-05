"use client"

import { useUserStore } from "@/store/user-store";
import { Box, Flex, Text } from "@radix-ui/themes";
import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import InfoControls from "../info-controls/info-controls";
import ProfileView from "./profile-view";
import ProfileEdit from "./profile-edit";
import LoadingRedirect from "../loading-redirect/loading-redirect";

const ProfileInfo: FC = observer(() => {
  const [isEditMode, setIsEditMode] = useState(false);
  const userStore = useUserStore();

  let content

  if (!userStore.getUserData) {
    content = <LoadingRedirect isLoading={false} />
    return content;
  }

  const user = userStore.getUserData!;

  const handleDelete = async () => {
    await userStore.deleteUser();
  };

  if (isEditMode) {
    content = <ProfileEdit user={user} setIsEditMode={setIsEditMode} />
  } else {
    content =
      <Flex direction="column" gap="3">
        <ProfileView user={user} />
        <InfoControls
          setIsEditMode={setIsEditMode}
          deleteAction={handleDelete}
          deleteTarget="User"
        />
      </Flex>
  }

  return content;
});

export default ProfileInfo;