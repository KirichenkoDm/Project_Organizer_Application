import React, { FC } from 'react'
import styles from "./app-header.module.css"
import { Box, Popover } from '@radix-ui/themes';
import AppButton from '../app-button/app-button';
import { useNotificationsStore } from '@/store/notifications-store';

const NotificationBar: FC = () => {
  const notificationsStore = useNotificationsStore();

  return (
    <Popover.Root>
      <Popover.Trigger>
        <AppButton size="2" className={styles.notificationsButton}>
          {
            notificationsStore.hasNotifications && notificationsStore.hasUnreadNotifications
              ? "New notifications"
              : "No new notifications"
          }
        </AppButton>
      </Popover.Trigger>
      <Popover.Content width="360px">
        {notificationsStore.hasNotifications && notificationsStore.hasUnreadNotifications
          ? notificationsStore.getNotifications.map((notification => (
            <Box>
              {notification.message}
              <AppButton size="1">✓</AppButton>
            </Box>
          )))
          : "Nothing here!"
        }
      </Popover.Content>
    </Popover.Root>
  );
}

export default NotificationBar;
