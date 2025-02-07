/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useSession } from "../../../../store/AuthContext";
import colors from "../../../../consts/colors";
import { headerTitleStyle } from "../../../../consts/styles";

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
            headerTitleStyle,
            contentStyle: { backgroundColor: colors.white },
            title: "My Budgets",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            headerTitleStyle,
            contentStyle: { backgroundColor: colors.white },
            title: "My Profile",
          }}
        />
        <Stack.Screen
          name="add-budget"
          options={{
            headerTitleStyle,
            contentStyle: { backgroundColor: colors.white },
            title: "New budget",
          }}
        />
        <Stack.Screen
          name="budget/[id]/index"
          options={{ title: "", headerTitleStyle }}
        />
        <Stack.Screen
          name="budget/[id]/update-budget"
          options={{ title: "Update Budget", headerTitleStyle }}
        />
        <Stack.Screen
          name="budget/[id]/add-transaction"
          options={{
            contentStyle: { backgroundColor: colors.white },
            title: "New Transaction",
            headerTitleStyle,
          }}
        />
        <Stack.Screen
          name="budget/[id]/update-transaction"
          options={{
            title: "Update Transaction",
            headerTitleStyle,
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
