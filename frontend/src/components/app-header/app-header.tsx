import { Box, Flex } from '@radix-ui/themes';
import { FC } from 'react';
import AppLogo from '../app-logo/app-logo';
import AppUserBadge from '../app-user-badge/app-user-badge';
import NotificationBar from './app-header-notification-box';
import styles from "./app-header.module.css";
import { useUserStore } from '@/store/user-store';

const AppHeader: FC = () => {
  const isAdmin = useUserStore().isAdmin;
  return (
    <Box className={styles.appHeaderContainer}>
      <header className={styles.appHeader}>
        <AppLogo />
        <Flex align="center">
          {isAdmin && <NotificationBar />}
          <AppUserBadge />
        </Flex>
      </header>
    </Box>
  )
}

export default AppHeader;
