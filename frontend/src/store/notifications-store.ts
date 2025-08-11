import { types } from "mobx-state-tree";
import { Notification, NotificationInstance } from "./models/notification";
import { useStore } from "./root-provider";

export const NotificationsStore = types
  .model("NotificationsStore", {
    notifications: types.array(Notification),
    error: types.maybe(types.string),
  })
  .views(self => ({
    get hasNotifications(): boolean {
      return self.notifications.length > 0;
    },
    get hasUnreadNotifications(): boolean {
      return self.notifications.some(n => !n.isRead);
    },

    get getNotifications(): NotificationInstance[] {
      return self.notifications;
    },

    get getNotificationsAmount(): number {
      return self.notifications.length;
    }
  }))
  .actions(self => ({
    addNotification(notification: NotificationInstance) {
      self.notifications.unshift(notification);
    },
    markAsRead(id: number) {
      const notification = self.notifications.find(n => n.id === id);
      if (notification) notification.isRead = true;
    },
    clear() {
      self.notifications.clear();
    },
  }));

  export const useNotificationsStore = () => {
    // return useStore().notificationsStore;
  }