import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

const Spinner = ({ visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size="medium" color="black" />
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
});

Spinner.propTypes = {
  visible: PropTypes.bool.isRequired,
};
