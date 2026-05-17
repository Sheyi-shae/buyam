// ↓ Change this to your actual Google OAuth initiation endpoint
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const GOOGLE_OAUTH_URL = `${backendUrl}/api/auth/google`;

export type PopupResult = "success" | "dismissed";

export function openGoogleAuthPopup(): Promise<PopupResult> {
  return new Promise((resolve) => {
    const w = 500, h = 620;
    const left = window.screenX + (window.outerWidth - w) / 2;
    const top  = window.screenY + (window.outerHeight - h) / 2;

    const popup = window.open(
      GOOGLE_OAUTH_URL,
      "google_auth_popup",
      `width=${w},height=${h},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );

    // If browser blocked the popup, fall back to a full redirect
    if (!popup) {
      window.location.href = GOOGLE_OAUTH_URL;
      return;
    }

    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type === "GOOGLE_AUTH_SUCCESS") {
        cleanup();
        resolve("success");
      }
    };

    // Detect if the user manually closes the popup
    const pollClosed = setInterval(() => {
      if (popup.closed) {
        cleanup();
        resolve("dismissed");
      }
    }, 500);

    const cleanup = () => {
      clearInterval(pollClosed);
      window.removeEventListener("message", onMessage);
      if (!popup.closed) popup.close();
    };

    window.addEventListener("message", onMessage);
  });
}