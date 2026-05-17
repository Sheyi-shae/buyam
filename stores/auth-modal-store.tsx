import { create } from "zustand";

type AuthModalReason = "session_expired" | "action_required" | "protected_route";

interface AuthModalState {
  isOpen: boolean;
  reason: AuthModalReason;
  message: string;
  pendingAction?: () => void;
}

interface AuthModalActions {
  openForAction: (message?: string, onSuccess?: () => void) => void;
  openForExpiredSession: () => void;
  openForProtectedRoute: () => void;
  close: () => void;
  runPendingAction: () => void;
}

export const useAuthModalStore = create<AuthModalState & AuthModalActions>(
  (set, get) => ({
    isOpen: false,
    reason: "action_required",
    message: "",
    pendingAction: undefined,

    openForAction: (message = "Sign in to continue", onSuccess) =>
      set({ isOpen: true, reason: "action_required", message, pendingAction: onSuccess }),

    
    openForExpiredSession: (onSuccess?: () => void) =>
    set({
        isOpen: true,
        reason: "session_expired",
        message: "Your session has expired. Sign in to pick up where you left off.",
        pendingAction: onSuccess,
    }),

    openForProtectedRoute: () =>
      set({
        isOpen: true,
        reason: "protected_route",
        message: "Please sign in to access this page.",
      }),

    close: () => set({ isOpen: false, pendingAction: undefined }),

    runPendingAction: () => {
      get().pendingAction?.();
      set({ pendingAction: undefined });
    },
  })
);