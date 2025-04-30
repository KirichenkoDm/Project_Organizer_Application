import { ProjectThemeEnum } from "@/shared/project-theme.enum";
import Link from "next/link";
import React, { FC } from "react";
import styles from "./home-project-list-item.module.css";

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
    <Link href={`/projects/${id}`}>
      <div className={styles.projectCard}>
        <h3 className={styles.projectName}>{name}</h3>
        <span>{theme}</span>
        <p className={styles.projectDescription}>{description}</p>
      </div>
    </Link>
  );
};

export default HomeProjectListItem;