import React, { FC } from 'react'
import styles from "./app-header.module.css"
import { Box } from '@radix-ui/themes';
import AppLogo from '../app-logo/app-logo';
import AppUserBadge from '../app-user-badge/app-user-badge';

const AppHeader: FC = () => {
  return (
    <Box className={styles.appHeaderContaner}>
      <header className={styles.appHeader}>
        <AppLogo />
        <AppUserBadge/>
      </header>
    </Box>
  )
}

export default AppHeader;
