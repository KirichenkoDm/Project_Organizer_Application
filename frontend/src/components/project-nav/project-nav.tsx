"use client";

import { Flex, Heading, TabNav, Text } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react"

interface ProjectNav {
  projectId: number;
}

const ProjectNav: FC<ProjectNav> = ({ projectId }) => {
  const pathname = usePathname();
  const baseUrl = `/project/${projectId}`

  return (
    <TabNav.Root
      size="2"
    >
      <Flex align="center" >
        <Heading as="h6"></Heading>
        <TabNav.Link asChild active={pathname === `${baseUrl}/info`}>
          <Link href={`${baseUrl}/info`}>Info</Link>
        </TabNav.Link>
        <TabNav.Link asChild active={pathname === `${baseUrl}/board`}>
          <Link href={`${baseUrl}/board`}>Board</Link>
        </TabNav.Link>
      </Flex>

    </TabNav.Root>
  )
}

export default ProjectNav;
