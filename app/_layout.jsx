import React from "react";
import { Slot } from "expo-router";
import { SessionProvider } from "../store/AuthContext";

const Root = () => {
  console.log("root");
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
};

export default Root;
