import { Stack } from "expo-router";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import "../global.css";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";

export default function RootLayout() {
  const { isAuthenticated, hydrate } = useAuthStore();

  console.log({ rootIsAuth: isAuthenticated });

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <GluestackUIProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        )}
      </Stack>
    </GluestackUIProvider>
  );
}
