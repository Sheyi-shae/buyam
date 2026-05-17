"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useAuthStore } from "@/stores/auth-stores";
import { useQueryClient } from "@tanstack/react-query";
import apiPrivate from "@/utils/api-private";
import { toast } from "sonner";
import { PageLoader } from "@/components/loading-spinners";

function AuthCallbackInner() {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();

  const returnTo = searchParams.get("redirectTo") || "/";

  // True when this page is loaded inside the auth popup window
  const isPopup =
    typeof window !== "undefined" &&
    window.opener &&
    window.opener !== window;

  useEffect(() => {
    let mounted = true;

    apiPrivate
      .get("/auth/me")
      .then((res) => {
        if (!mounted) return;

        setUser(res.data.data);

        if (isPopup) {
          // ── Popup flow ──────────────────────────────────────────────────
          // Invalidate the currentUser query so AuthModal re-fetches after
          // the popup closes and the modal calls refetchQueries
          queryClient.invalidateQueries({ queryKey: ["currentUser"] });

          // Signal the parent window that auth succeeded, then self-close
          window.opener.postMessage(
            { type: "GOOGLE_AUTH_SUCCESS" },
            window.location.origin
          );
          window.close();
        } else {
          // ── Direct navigation flow ──────────────────────────────────────
          toast.success("Logged in successfully");
          router.replace(returnTo);
        }
      })
      .catch((err) => {
        console.error("Auth callback error:", err);

        if (isPopup) {
          // Let the parent know something went wrong so it can reset state
          window.opener?.postMessage(
            { type: "GOOGLE_AUTH_ERROR" },
            window.location.origin
          );
          window.close();
        } else {
          router.replace(
            `/signin&signup-auth?returnTo=${encodeURIComponent(returnTo)}`
          );
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Popup: render nothing (window closes itself)
  // Direct: show a loader while redirect happens
  return isPopup ? null : <PageLoader />;
}

export default function AuthCallback() {
  return (
    <Suspense fallback={<PageLoader />}>
      <AuthCallbackInner />
    </Suspense>
  );
}