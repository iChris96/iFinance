import React from "react";
import { Stack } from "expo-router/stack";
import { Redirect } from "expo-router";
import { useSession } from "../../../../store/AuthContext";
import { headerTitleStyle, contentStyle } from "../../../../consts/styles";

const Layout = () => {
  const { session } = useSession();

  console.log({ settingsession: session });

  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitleStyle,
          contentStyle,
          title: "My Settings",
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default Layout;
