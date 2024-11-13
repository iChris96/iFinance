import React from "react";
import { View, Text, StyleSheet } from "react-native";

import NavigatorButton from "../components/NavigatorButton";

const App = () => {
  const user = {};

  return (
    <View style={{ ...styles.container }}>
      <Text>{`User: ${JSON.stringify(user)}`}</Text>
      <NavigatorButton href="/profile" title="Navigate to profile" />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
  },
});
