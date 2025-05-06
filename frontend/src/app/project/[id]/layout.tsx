"use client";
import AppHeader from "@/components/app-header/app-header";
import ProjectNavSidebar from "@/components/project-nav-sidebar/project-nav-sidebar";
import { useProjectStore } from "@/store/project-store";
import { Box } from "@radix-ui/themes";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  const { id } = useParams()

  if (!id) return null;
  const projectId = Number(id);

  const projectStore = useProjectStore();
  useEffect(() => {
    
    projectStore.fetchProject(projectId);
    projectStore.fetchColumns(projectId)
    projectStore.fetchTasks(projectId);
  }, [])


  return (
    <Box>
      <AppHeader />
      <ProjectNavSidebar projectId={projectId}/>
      <div>
        <main>{children}</main>
      </div>
    </Box>
  );
}
export default ProjectLayout;