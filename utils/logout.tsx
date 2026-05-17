import { useAuthStore } from "@/stores/auth-stores";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import apiPrivate from "./api-private";

export const useBackendLogout = () => {
  const { setUser, logout: logoutFromStore } = useAuthStore();
  const queryClient = useQueryClient();

  const logout = async () => {
    try {
      await apiPrivate.post("/auth/logout");

      setUser(null);
      logoutFromStore();
      queryClient.clear();

      // Cross-tab sync
      localStorage.setItem("logout", Date.now().toString());

      toast.success("Logged out successfully");

      // ← No redirect: marketplace users can keep browsing.
      // If you need to redirect for certain pages (e.g. /dashboard),
      // call router.replace("/") *only* inside those page components.
    } catch {
      toast.error("Failed to logout");
    }
  };

  return logout;
};