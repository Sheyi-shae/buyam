"use client";

import { useAuthStore } from "@/stores/auth-stores";
import { useCurrentUser } from "@/utils/current-user-hook";
import { useAppSocket } from "./socket-provider";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";
import { PageLoader } from "@/components/loading-spinners";
import { useAuthModalStore } from "@/stores/auth-modal-store";

interface AuthProviderProps {
  children: ReactNode;
  protection?: boolean;
  msg?: string;
}

export function AuthProvider({ children, protection,  }: AuthProviderProps) {
  const { data: user, isLoading, error } = useCurrentUser();
  const { socket, isConnected } = useAppSocket();
  const { setUser } = useAuthStore();
  const { openForProtectedRoute, openForExpiredSession, close, isOpen } =
    useAuthModalStore();

  
  const hadSession = useRef(false);

 
  // Sync user → store
  useEffect(() => {
    if (isLoading) return;
    if (user) {
      setUser(user);
      hadSession.current = true;
      // If modal was open (they just re-authed), close it
      if (isOpen) close();
    }
  }, [user, setUser, isLoading, isOpen, close]);

  // Protected route
  useEffect(() => {
    if (!protection || isLoading) return;
    if (!user || error) {
      if (hadSession.current) {
        openForExpiredSession();      
      } else {
        openForProtectedRoute();     
      }
    }
  }, [protection, isLoading, user, error, openForExpiredSession, openForProtectedRoute]);

  // Socket room join
  useEffect(() => {
    if (!user?.id || !isConnected) return;
    socket?.emit("join", user.id);
  }, [user?.id, isConnected, socket]);

  // Show full-screen loader while checking auth on protected routes
  if (protection && isLoading) {
    return <PageLoader />;
  }

  
  if (protection && !user) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none select-none blur-sm brightness-75 transition-all duration-300"
      >
        {children}
      </div>
    );
  }

  return <>{children}</>;
}