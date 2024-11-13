import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import PropTypes from "prop-types";
import colors from "../consts/colors";

const Button = ({
  onPress,
  title,
  disabled = false,
  backgroundColor = colors.black,
}) => (
  <Pressable
    style={{
      ...styles.button,
      backgroundColor: disabled ? colors.grey : backgroundColor,
    }}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.text}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 4,
    elevation: 3,
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.25,
    lineHeight: 21,
  },
});

export default Button;

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  disabled: PropTypes.bool,
};
