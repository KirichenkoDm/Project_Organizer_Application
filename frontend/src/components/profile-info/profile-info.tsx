"use client"

import { useUserStore } from "@/store/user-store";
import { Flex } from "@radix-ui/themes";
import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import InfoControls from "../info-controls/info-controls";
import ProfileView from "./profile-view";
import ProfileEdit from "./profile-edit";
import { useRouter } from "next/navigation";

const ProfileInfo: FC = observer(() => {
  const [isEditMode, setIsEditMode] = useState(false);
  const userStore = useUserStore();
  const user = userStore.getUserData!;
  const router = useRouter();
  const handleDelete = async () => {
    await userStore.deleteUser();
    router.replace("/auth");
  };

  let content

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