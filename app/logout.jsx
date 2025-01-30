import React from "react";
import { View } from "react-native";
import { Redirect } from "expo-router";
import Text from "../components/Text";
import { useSession } from "../store/AuthContext";

const LogOutScreen = () => {
  const { signOut, session } = useSession();

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  React.useEffect(() => {
    signOut();
  }, []);

  return (
    <View>
      <Text>Logging out...</Text>
    </View>
  );
};
export default LogOutScreen;
