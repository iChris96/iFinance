import React from "react";
import {
  StyleSheet,
  Pressable,
  Platform,
  ActivityIndicator,
} from "react-native";
import PropTypes from "prop-types";
import colors from "../consts/colors";
import Text from "./Text";

const getHoveredStyle = (hovered, hoveredColor) => {
  if (Platform.OS !== "web" || !hovered) {
    return {};
  }

  return { backgroundColor: hoveredColor };
};

const getButtonStyles = ({
  style,
  hovered,
  pressed,
  rounded,
  hoveredColor,
}) => [
  styles.button,
  rounded && styles.rounded,
  pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 },
  style,
  getHoveredStyle(hovered, hoveredColor),
];

const Button = ({
  onPress,
  title,
  disabled = false,
  style = {},
  loading = false,
  rounded = true,
  hoveredColor = colors.primaryButtonHoverColor,
  textColor = "white",
}) => (
  <Pressable
    style={
      ({ hovered, pressed }) =>
        getButtonStyles({ style, hovered, pressed, rounded, hoveredColor })
      // eslint-disable-next-line react/jsx-curly-newline
    }
    onPress={onPress}
    disabled={disabled}
  >
    {loading ? (
      <ActivityIndicator size="small" color="white" />
    ) : (
      <Text subtitle color={textColor} style={styles.text}>
        {title}
      </Text>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.primaryButtonBackgroundColor,
    elevation: 3,
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
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
  hoveredColor: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  loading: PropTypes.bool,
  rounded: PropTypes.bool,
  textColor: PropTypes.string,
};
