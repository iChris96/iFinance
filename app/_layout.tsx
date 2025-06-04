import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import "../global.css";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";
import {
  QueryClient,
  QueryClientProvider,
  onlineManager,
  focusManager,
} from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";
import { AppState, Platform } from "react-native";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { isAuthenticated, hydrate } = useAuthStore();

  console.log({ isAuthenticated });

  useEffect(() => {
    hydrate().finally(() => {
      if (isAuthenticated) {
        router.replace("/(tabs)");
      } 
    });
    return () => {
      // Cleanup if needed
      console.log("Cleaning up RootLayout");
      queryClient.clear();
    };
  }, [hydrate, isAuthenticated]);

  useEffect(() => {
    onlineManager.setEventListener((setOnline) => {
      return NetInfo.addEventListener((state) => {
        setOnline(!!state.isConnected);
      });
    });

    const subscription = AppState.addEventListener("change", (status) => {
      if (Platform.OS !== "web") {
        focusManager.setFocused(status === "active");
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <Stack.Screen name="(tabs)" />
          ) : (
            <Stack.Screen name="(auth)" />
          )}
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
