"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "@/stores/auth-stores";

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  // FIX: track socket in state so context consumers re-render when it becomes available
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!user?.id) {
      socketRef.current?.disconnect();
      socketRef.current = null;
      setSocket(null);
      setIsConnected(false);
      return;
    }

    const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL!, {
      withCredentials: true,
      transports: ["websocket", "polling"],
      reconnection: true,
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
      newSocket.emit("join");
      setIsConnected(true);
    });

    // FIX: re-join on every reconnect so activeUsers stays in sync after a blip
    newSocket.on("reconnect", () => {
     // console.log("Socket reconnected, re-joining...");
      newSocket.emit("join");
    });

    newSocket.on("disconnect", (reason) => {
     console.log("Socket disconnected:", reason);
      setIsConnected(false);
    });

    newSocket.on("connect_error", (err) => {
      //console.error("Socket connect_error:", err.message);
    });

    return () => {
      newSocket.off();
      newSocket.disconnect();
      socketRef.current = null;
      setSocket(null);
    };
  }, [user?.id]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useAppSocket = () => useContext(SocketContext);