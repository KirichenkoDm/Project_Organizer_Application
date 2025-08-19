import { NotificationInstance } from '@/store/models/notification';
import { useNotificationsStore } from '@/store/notifications-store';
import { Box, Flex, Popover, ScrollArea, Separator, Text } from '@radix-ui/themes';
import { observer } from 'mobx-react-lite';
import React, { FC, useState } from 'react';
import AppButton from '../app-button/app-button';
import styles from "./app-header.module.css";

interface NotificationCardProps {
  notification: NotificationInstance;
  onMarkAsRead: (id: number) => void;
}

const NotificationCard: FC<NotificationCardProps> = ({ notification, onMarkAsRead }) => {
  const [isMarking, setIsMarking] = useState(false);

  const handleMarkAsRead = async () => {
    if (notification.isRead || isMarking) return;

    setIsMarking(true);
    try {
      onMarkAsRead(notification.id);
    } finally {
      setIsMarking(false);
    }
  };

  return (
    <Box className={`${styles.notificationCard} ${notification.isRead ? styles.read : styles.unread}`}>
      <Flex justify="between" align="start" gap="2">
        <Box style={{ flex: 1, minWidth: 0 }}>
          <Text
            size="2"
            weight={notification.isRead ? "regular" : "medium"}
            className={styles.message}
          >
            {notification.message}
          </Text>
        </Box>

        {!notification.isRead && (
          <AppButton
            size="1"
            variant="ghost"
            className={styles.markButton}
            onClick={handleMarkAsRead}
            disabled={isMarking}
            title="Mark as read"
          >
            ✓
          </AppButton>
        )}
      </Flex>
    </Box>
  );
}

const NotificationBar: FC = observer(() => {
  const notificationsStore = useNotificationsStore();
  const [isOpen, setIsOpen] = useState(false);
  const totalCount = notificationsStore.getNotificationsAmount;

  const handleMarkAsRead = (id: number) => {
    notificationsStore.markAsRead(id);
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>
        <AppButton size="2" className={styles.notificationsButton}>
          {
            notificationsStore.hasNotifications && notificationsStore.hasUnreadNotifications
              ? "New notifications"
              : "No new notifications"
          }
        </AppButton>
      </Popover.Trigger>
      <Popover.Content
        width="380px"
        className={styles.popoverContent}
        side="bottom"
        align="end"
      >
        <Box>
          <Flex align="center" mb="3" px="1">
            <Text size="3" weight="medium">
              Notifications
            </Text>
          </Flex>

          <Separator size="4" mb="2" />

          {notificationsStore.hasNotifications ? (
            <ScrollArea
              style={{ height: '400px' }}
              scrollbars="vertical"
              className={styles.scrollArea}
            >
              <Box className={styles.notificationsList}>
                {notificationsStore.getNotifications.map((notification, index) => (
                  <React.Fragment key={notification.id}>
                    <NotificationCard
                      notification={notification}
                      onMarkAsRead={handleMarkAsRead}
                    />
                    {index < totalCount - 1 && (
                      <Separator size="1" my="2" />
                    )}
                  </React.Fragment>
                ))}
              </Box>
            </ScrollArea>
          ) : (
            <Box className={styles.emptyState}>
              <Flex direction="column" align="center" gap="2" py="6">
                <Text size="2" color="gray">
                  No notifications yet
                </Text>
                <Text size="1" color="gray">
                  You'll see admin notifications here
                </Text>
              </Flex>
            </Box>
          )}
        </Box>
      </Popover.Content>
    </Popover.Root>
  );
});

export default NotificationBar;
