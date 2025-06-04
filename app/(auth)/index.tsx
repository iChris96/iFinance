import { useAuthStore } from "@/store/authStore";
import { Redirect, router } from "expo-router";
import { useEffect } from "react";

export default function AuthIndex() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      return router.replace("/(tabs)");
    }
  }, [isAuthenticated]);

  return <Redirect href="/login" />;
}
