import { useAuthStore } from "@/store/authStore";
import { Redirect, router } from "expo-router";
import { useEffect } from "react";

export default function TabsIndex() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      return router.replace("/(auth)");
    }
  }, [isAuthenticated]);

  return <Redirect href="/home" />;
}
