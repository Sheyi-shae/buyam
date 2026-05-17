import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { useAuthModalStore } from "@/stores/auth-modal-store";
import { useAuthStore } from "@/stores/auth-stores";

// ─── Env Validation ───────────────────────────────────────────────────────────
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
if (!backendUrl) throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");

const REFRESH_URL = "/auth/refresh";

// ─── Refresh Queue (handles concurrent 401s) ──────────────────────────────────
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(null)));
  failedQueue = [];
};

// ─── Instance ─────────────────────────────────────────────────────────────────
const apiPrivate: AxiosInstance = axios.create({
  baseURL: `${backendUrl}/api`,
  withCredentials: true,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// ─── Response Interceptor ─────────────────────────────────────────────────────
apiPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const is401 = error.response?.status === 401;
    const isRefreshRoute = original.url === REFRESH_URL;

    if (!is401 || original._retry || isRefreshRoute) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => apiPrivate(original))
        .catch((err) => Promise.reject(err));
    }

    original._retry = true;
    isRefreshing = true;

    try {
      await apiPrivate.post(REFRESH_URL);
      processQueue(null);
      return apiPrivate(original);
    } catch (err) {
      processQueue(err);

      if (typeof window !== "undefined") {
        // ✅ Clear auth state without redirecting
        useAuthStore.getState().setUser(null);
        useAuthStore.getState().logout();

        // ✅ Open the modal — the user stays exactly where they are
        useAuthModalStore.getState().openForExpiredSession();
      }

      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default apiPrivate;

// ─── Error Utility ────────────────────────────────────────────────────────────
export function parseErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? "Something went wrong";
  }
  return "An unexpected error occurred";
}