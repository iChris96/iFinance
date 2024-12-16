import React from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useSession } from "../../store/AuthContext";
import colors from "../../consts/colors";

const AppLayout = () => {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
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
};

export default AppLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
