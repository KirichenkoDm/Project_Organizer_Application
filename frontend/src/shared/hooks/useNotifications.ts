import { parseCookies } from "nookies";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { COOKIE_ACCESS_TOKEN_KEY } from "../constants";
import { useUserStore } from "@/store/user-store";
import { useNotificationsStore } from "@/store/notifications-store";

interface NotificationPayload {
  message: string;
}

export default () => {
  const userStore = useUserStore();
  const notificationsStore = useNotificationsStore()
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    async function connectWS() {
      await userStore.refresh();
      const accessToken = parseCookies()[COOKIE_ACCESS_TOKEN_KEY];
      if (!accessToken) return;

      socketRef.current = io(process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001", {
        auth: { accessToken },
        transports: ["websocket"],
      });

      socketRef.current.on("notification", (data: NotificationPayload) => {
        notificationsStore.addNotification({
          id: notificationsStore.getNotificationsAmount,
          message: data.message,
          isRead: false,
        });
      });

      socketRef.current.on("connect_error", (err) => {
        console.error("WS connect error:", err.message);
      });
    }

    connectWS();

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return;
}
