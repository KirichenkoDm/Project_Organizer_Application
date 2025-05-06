"use client";

import { Flex, TabNav } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react"

interface ProjectNavSidebar {
  projectId: number;
}

const ProjectNavSidebar: FC<ProjectNavSidebar> = ({projectId}) => {
  const pathname = usePathname();
  const baseUrl = `/project/${projectId}`

  return (
    <TabNav.Root
      size="2"
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   width: "200px",
      // }}
    >
  {/* <Flex direction="column" gap="2" asChild>
    <aside> */}
      <TabNav.Link asChild active={pathname === `${baseUrl}/info`}>
        <Link href={`${baseUrl}/info`}>Info</Link>
      </TabNav.Link>
      <TabNav.Link asChild active={pathname === `${baseUrl}/board`}>
        <Link href={`${baseUrl}/board`}>Board</Link>
      </TabNav.Link>
      <TabNav.Link asChild active={pathname === `${baseUrl}/archive`}>
        <Link href={`${baseUrl}/archive`}>Archive</Link>
      </TabNav.Link>
    {/* </aside>
  </Flex> */}
</TabNav.Root>

  )
}

export default ProjectNavSidebar;
