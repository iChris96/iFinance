import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Home from "./components/Home/home";

const App = () => (
  <SafeAreaView style={{ ...styles.container }}>
    <Home />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
});

export default App;
