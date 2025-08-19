import { parseCookies } from "nookies";
import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { COOKIE_ACCESS_TOKEN_KEY } from "../constants";
import { useUserStore } from "@/store/user-store";
import { useNotificationsStore } from "@/store/notifications-store";

interface NotificationPayload {
  message: string;
}

type WebSocketStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export default () => {
  const userStore = useUserStore();
  const notificationsStore = useNotificationsStore()
  const socketRef = useRef<Socket | null>(null);
  const [status, setStatus] = useState<WebSocketStatus>('disconnected');
  const [error, setError] = useState<string | null>(null);

  const isUserAdmin = userStore.isAdmin;
  const isAuthenticated = userStore.isAuthenticated;

  const isConnectingRef = useRef<boolean>(false);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      console.log('Disconnecting WebSocket...');
      socketRef.current.disconnect();
      socketRef.current = null;
      setStatus('disconnected');
    }
  }, []);

  const connect = useCallback(async () => {
    if (!isAuthenticated || !isUserAdmin) {
      return;
    };

    if (isConnectingRef.current || socketRef.current?.connected) {
      console.log('Connection already in progress or established');
      return;
    }

    try {
      setStatus('connecting');
      setError(null);

      // await userStore.refresh();

      const accessToken = parseCookies()[COOKIE_ACCESS_TOKEN_KEY];
      if (!accessToken) {
        throw new Error('No access token found');
      }

      disconnect();

      socketRef.current = io(process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001", {
        auth: { accessToken },
        transports: ["websocket"],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
        timeout: 10000,
      });

      socketRef.current.on('connect', () => {
        console.log('connected');
        setStatus('connected');
        setError(null);
      });

      socketRef.current.on('disconnect', (reason) => {
        console.log('WebSocket disconnected:', reason);
        setStatus('disconnected');

        if (reason !== 'io client disconnect') {
          setError(`Connection lost: ${reason}`);
        }
      });

      socketRef.current.on('notification', (data: NotificationPayload) => {
        console.log("got notification:");
        console.log(data);
        notificationsStore.addNotification({
          id: Date.now(),
          message: data.message,
          isRead: false,
        });
      });

      socketRef.current.on('connect_error', (err) => {
        setStatus('error');
        setError(err.message);
      });

      socketRef.current.on('error', (err) => {
        setStatus('error');
        setError(typeof err === 'string' ? err : 'WebSocket error occurred');
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect to WebSocket';
      setStatus('error');
      setError(errorMessage);
    }
  }, [isAuthenticated, isUserAdmin, userStore, notificationsStore, disconnect]);

  useEffect(() => {
    if (isAuthenticated && isUserAdmin && !socketRef.current?.connected && !isConnectingRef.current) {
      connect();
    } else {
      disconnect();
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        isConnectingRef.current = false;
      }
    };
  }, [isAuthenticated, isUserAdmin, connect, disconnect]);
}
