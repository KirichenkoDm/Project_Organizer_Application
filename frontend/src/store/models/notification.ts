import { Instance, types } from "mobx-state-tree";

export const Notification = types.model("Notification", {
  id: types.identifierNumber,
  message: types.string,
  isRead: types.optional(types.boolean, false),
});

export type NotificationInstance = Instance<typeof Notification>;