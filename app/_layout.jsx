import { Stack } from "expo-router";
import React from "react";
import { RecordsProvider } from "./store/RecordContext";
import colors from "./consts/colors";

const RootLayout = () => (
  <RecordsProvider>
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerStyle: { backgroundColor: colors.statusBar },
          title: "",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="billings/[bill]"
        options={{
          headerStyle: { backgroundColor: colors.statusBar },
          title: "",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="record"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "white" },
          title: "Record",
        }}
      />
    </Stack>
  </RecordsProvider>
);

export default RootLayout;
