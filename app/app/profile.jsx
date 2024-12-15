import { View, Text } from "react-native";
import React from "react";

export default function profile() {
  const user = {};
  return (
    <View>
      <Text>profile</Text>
      <Text>{`User: ${JSON.stringify(user)}`}</Text>
    </View>
  );
}
