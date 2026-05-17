"use client";

import { useCallback } from "react";
import { useAuthStore } from "@/stores/auth-stores";
import { useAuthModalStore } from "@/stores/auth-modal-store";

/**
 * Guards any action behind authentication.
 *
 * Usage:
 *   const { requireAuth } = useAuthGate();
 *   <button onClick={() => requireAuth(handleLike, "Sign in to like items")}>♥</button>
 */
export function useAuthGate() {
  const user = useAuthStore((s) => s.user);
  const openForAction = useAuthModalStore((s) => s.openForAction);

  const requireAuth = useCallback(
    (action?: () => void, message?: string): boolean => {
      if (user) {
        action?.();
        return true; // was authenticated — action ran
      }
      openForAction(message, action);
      return false; // not authenticated — modal opened
    },
    [user, openForAction]
  );

  return { requireAuth, isAuthenticated: !!user };
}