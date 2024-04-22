import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { RecordsProvider } from "./store/RecordContext";

const RootLayout = () => {
  return (
    <RecordsProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="record"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "white" },
          }}
        />
      </Stack>
    </RecordsProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
