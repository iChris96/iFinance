import React from "react";
import { Stack } from "expo-router/stack";

const Layout = () => (
  <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  </Stack>
);

export default Layout;
