"use client"

import { Flex } from "@radix-ui/themes";
import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import InfoControls from "../info-controls/info-controls";
import { useProjectStore } from "@/store/project-store";
import { useRouter } from "next/navigation";
import ProjectView from "./project-view";
import ProjectEdit from "./project-edit";
import { useUserStore } from "@/store/user-store";

const ProjectInfo: FC = observer(() => {
  const [isEditMode, setIsEditMode] = useState(false);
  const projectStore = useProjectStore();
  const router = useRouter();
  const rolePriority = useUserStore().getRolePriority;
  let content;

  const project = projectStore.getProject;
  if (!project) return;

  const handleDelete = async () => {
    router.push("/home")
    await projectStore.deleteProject();
  };

  if (isEditMode) {
    content = <ProjectEdit project={project} setIsEditMode={setIsEditMode} />
  } else {
    content =
      <Flex direction="column" gap="3">
        <ProjectView project={project} />
        {
          rolePriority >= 2
            ?
            <InfoControls
              setIsEditMode={setIsEditMode}
              deleteAction={handleDelete}
              deleteTarget="Project"
            />
            : null
        }
      </Flex>
  }

  return content;
});

export default ProjectInfo;