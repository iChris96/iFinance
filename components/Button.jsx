import React from "react";
import { StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import colors from "../consts/colors";
import Text from "./Text";

const variantStyles = {
  primary: { backgroundColor: colors.primaryButtonBackgroundColor },
  secondary: { backgroundColor: colors.white, borderWidth: 1 },
  action: {
    backgroundColor: colors.actionButtonBackgroundColor,
  },
};

const variantTextStyles = {
  primary: { color: colors.white },
  secondary: { color: colors.black },
  action: { color: colors.white },
};

const widthStyles = {
  full: { width: "100%" },
  auto: { width: "auto" },
};

const Button = ({
  onPress,
  title,
  loading = false,
  rounded = true,
  variant = "primary",
  width = "full",
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      variantStyles[variant],
      rounded && styles.rounded,
      widthStyles[width],
    ]}
    onPress={onPress}
  >
    {loading ? (
      <ActivityIndicator size="small" color="white" />
    ) : (
      <Text subtitlestyle={styles.text} style={variantTextStyles[variant]}>
        {title}
      </Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.primaryButtonBackgroundColor,
    elevation: 3,
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    width: "100%",
  },
  rounded: {
    borderRadius: 6,
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
  loading: PropTypes.bool,
  rounded: PropTypes.bool,
  variant: PropTypes.oneOf(["primary", "secondary", "action"]),
  width: PropTypes.oneOf(["auto", "full"]),
};
