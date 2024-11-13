import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import colors from "../consts/colors";

const RootLayout = () => (
  <SafeAreaView style={{ ...styles.container }}>
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerStyle: { backgroundColor: colors.statusBar },
          contentStyle: { backgroundColor: colors.white },
          title: "",
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="billings/[bill]"
        options={{
          headerStyle: { backgroundColor: colors.statusBar },
          title: "",
          headerTransparent: true,
        }}
      /> */}
      <Stack.Screen
        name="profile"
        options={{
          contentStyle: { backgroundColor: colors.white },
          title: "My Profile",
        }}
      />
    </Stack>
  </SafeAreaView>
);

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
