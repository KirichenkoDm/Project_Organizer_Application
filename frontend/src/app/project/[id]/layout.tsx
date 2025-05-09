"use client";
import AppHeader from "@/components/app-header/app-header";
import ProjectNav from "@/components/project-nav/project-nav";
import { useProjectStore } from "@/store/project-store";
import { Box } from "@radix-ui/themes";
import { observer } from "mobx-react-lite";
import Head from "next/head";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const ProjectLayout = observer(({ children }: { children: React.ReactNode }) => {
  const { id } = useParams()
  if (!id) return null;

  const projectId = Number(id);
  const projectStore = useProjectStore();
  const projectName = projectStore.project?.name

  useEffect(() => {
    projectStore.loadProject(projectId);
  }, [])


  return (<>
    <Head>
      <title>{projectName}</title>
    </Head>
    <Box>
      <AppHeader />
      <ProjectNav projectId={projectId} projectName={projectName ?? "loading"}/>
      <div>
        <main>{children}</main>
      </div>
    </Box>
  </>);
});

export default ProjectLayout;