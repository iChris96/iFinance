/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import colors from "../../../consts/colors";

const TabLayout = () => (
  <Tabs screenOptions={{ tabBarActiveTintColor: colors.backgroundColor }}>
    <Tabs.Screen
      name="home"
      options={{
        title: "Home",
        tabBarIcon: ({ color }) => (
          <FontAwesome size={28} name="home" color={color} />
        ),
        headerShown: false,
      }}
    />
    <Tabs.Screen
      name="setup"
      options={{
        title: "Settings",
        tabBarIcon: ({ color }) => (
          <FontAwesome size={28} name="cog" color={color} />
        ),
        headerShown: false,
      }}
    />
  </Tabs>
);

export default TabLayout;
