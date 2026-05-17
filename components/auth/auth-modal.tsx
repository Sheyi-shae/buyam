"use client";

import { useEffect, useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { X, LogIn, Clock, ShieldCheck } from "lucide-react";
import { useAuthModalStore } from "@/stores/auth-modal-store";
import { openGoogleAuthPopup } from "@/utils/google-auth-popup";
import Link from "next/link";
import Image from "next/image";

// ↓ Must match the query key used inside your useCurrentUser hook
export const CURRENT_USER_QUERY_KEY = ["currentUser"];

const CONFIG = {
  session_expired: {
    icon: Clock,
    iconBg: "bg-amber-50 dark:bg-amber-900/20",
    iconColor: "text-amber-500",
    title: "Session Expired",
  },
  action_required: {
    icon: LogIn,
    iconBg: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-blue-500",
    title: "Sign In Required",
  },
  protected_route: {
    icon: ShieldCheck,
    iconBg: "bg-indigo-50 dark:bg-indigo-900/20",
    iconColor: "text-indigo-500",
    title: "Members Only",
  },
} as const;

export function AuthModal() {
  const { isOpen, reason, message, close, runPendingAction } = useAuthModalStore();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const queryClient = useQueryClient();

  const isDismissible = reason !== "protected_route";

  // Escape key to close (only for dismissible modals)
  useEffect(() => {
    if (!isOpen || !isDismissible) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, isDismissible, close]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleGoogleSignIn = useCallback(async () => {
    setStatus("loading");
    try {
      const result = await openGoogleAuthPopup();

      if (result === "dismissed") {
        setStatus("idle");
        return;
      }

      // Re-fetch user data and wait for it to settle
      await queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
      await queryClient.refetchQueries({ queryKey: CURRENT_USER_QUERY_KEY });

      runPendingAction();
      close();
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }, [queryClient, close, runPendingAction]);

  if (!isOpen) return null;

  const cfg = CONFIG[reason];
 

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-9999 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={isDismissible ? close : undefined}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-sm bg-gradient-to-br from-emerald-50 to-amber-50 rounded-xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden">
        {/* Top accent bar */}
       
        <div className="p-8">
          {/* Dismiss button */}
          {isDismissible && (
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-5 right-5 p-1.5 rounded-full text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X size={16} />
            </button>
          )}

          {/* Logo */}
          <Link href="/" className="flex items-center justify-center mb-6 space-x-2">
            <div className=" w-12 h-12 lg:w-16 lg:h-16 relative">
              <Image
                src={'/logo/buyam.png'}
                fill
                className="w-12 h-12 lg:w-16 lg:h-16  absolute"
                alt="logo"
              />
            </div>
          </Link>

          {/* Text */}
          <div className="text-center mb-8 space-y-2">
            <h2
              id="auth-modal-title"
              className="text-xl font-semibold text-neutral-900 dark:text-neutral-100"
            >
              {cfg.title}
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {message}
            </p>
          </div>

          {/* Google Sign-In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={status === "loading"}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700/80 active:scale-[0.98] transition-all font-medium text-sm text-neutral-700 dark:text-neutral-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 shadow-sm"
          >
            {status === "loading" ? (
              <>
                <div className="w-5 h-5 border-2 border-neutral-300 border-t-blue-500 rounded-full animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                <GoogleSVG />
                Continue with Google
              </>
            )}
          </button>

          {status === "error" && (
            <p className="mt-3 text-xs text-center text-red-500">
              Something went wrong. Please try again.
            </p>
          )}

          {isDismissible && (
            <p className="mt-4 text-xs text-center text-neutral-400">
              You can also{" "}
              <button onClick={close} className="underline underline-offset-2 text-primary hover:text-amber-600">
                continue browsing
              </button>{" "}
              without signing in.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function GoogleSVG() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}