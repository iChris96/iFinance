import React from "react";
import { Redirect } from "expo-router";
import { useSession } from "../store/AuthContext";

const Index = () => {
  const { session } = useSession();

  console.info({ session });
  return <Redirect href="/sign-in" />;
};

export default Index;
