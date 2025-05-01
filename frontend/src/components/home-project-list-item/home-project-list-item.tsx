import { ProjectThemeEnum } from "@/shared/project-theme.enum";
import Link from "next/link";
import React, { FC } from "react";
import styles from "./home-project-list-item.module.css";
import { Box, Heading, Text } from "@radix-ui/themes";

interface HomeProjectListItemProps {
  id: number;
  name: string;
  theme: ProjectThemeEnum;
  description: string;
}

const HomeProjectListItem: FC<HomeProjectListItemProps> = ({
  id,
  name,
  theme,
  description 
}) => {

  return (
    <Link href={`/projects/${id}`} className={styles.projectCardLink}>
      <Box className={styles.projectCard}>
        <Heading as="h3" className={styles.projectName}>{name}</Heading>
        <Text>{theme}</Text>
        <Text as="p" className={styles.projectDescription}>{description}</Text>
      </Box>
    </Link>
  );
};

export default HomeProjectListItem;