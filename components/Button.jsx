/* eslint-disable indent */
/* eslint-disable operator-linebreak */
/* eslint-disable react-native/no-unused-styles */
import React from "react";
import { StyleSheet, Pressable, Platform } from "react-native";
import PropTypes from "prop-types";
import colors from "../consts/colors";
import Text from "./Text";

const Button = ({
  onPress,
  title,
  disabled = false,
  type = "primary",
  style = {},
}) => (
  <Pressable
    style={({ hovered, pressed }) => ({
      ...styles.button,
      ...styles[type],
      ...(Platform.OS === "web" &&
        hovered && {
          backgroundColor: type === "primary" ? colors.blackLight : colors.grey,
        }),
      ...(pressed && {
        transform: [{ scale: 0.98 }],
        opacity: 0.9,
      }),
      ...style,
    })}
    onPress={onPress}
    disabled={disabled}
  >
    <Text
      subtitle
      color={type === "primary" ? "white" : "black"}
      style={styles.text}
    >
      {title}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 4,
    elevation: 3,
    justifyContent: "center",
    margin: 4,
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  primary: {
    backgroundColor: colors.black,
  },
  secondary: {
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1,
  },
  text: {
    letterSpacing: 0.25,
    lineHeight: 21,
  },
});

export default Button;

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
};
