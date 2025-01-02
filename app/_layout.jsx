import React from "react";
import { Slot } from "expo-router";
import { SessionProvider } from "../store/AuthContext";

const Root = () => (
  <SessionProvider>
    <Slot />
  </SessionProvider>
);

export default Root;
