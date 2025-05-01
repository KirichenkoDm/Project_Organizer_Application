import React, { FC } from "react";

import styles from "./home-projects-list.module.css";
import { Box, Text } from "@radix-ui/themes";

const EmptyList: FC = () => {
  return (
    <Box className={styles.emptyState}>
        <Text>You don't have any projects yet. Create your first project to get started!</Text>
    </Box>
  );
};

export default EmptyList;