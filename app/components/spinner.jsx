import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Spinner = (props) => {
  const { visible } = props;

  if (!visible) return <></>;
  return (
    <View style={styles.container}>
      <ActivityIndicator size="medium" color="black" />
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
