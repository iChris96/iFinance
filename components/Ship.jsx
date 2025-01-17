import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const Ship = ({ children, color }) => (
  <View style={{ ...styles.ship, ...{ backgroundColor: color } }}>
    {children}
  </View>
);

export default Ship;

const styles = StyleSheet.create({
  ship: {
    borderRadius: 4,
    padding: 4,
  },
});

Ship.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
};
