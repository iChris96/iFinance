import { Link } from "expo-router";
import PropTypes from "prop-types";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";

const NavigatorButton = ({
  title = "Navigate",
  pathname = "",
  params = {},
  relativeToDirectory = false,
}) => (
  <Link
    href={{ pathname, params }}
    asChild
    relativeToDirectory={relativeToDirectory}
  >
    <Pressable style={{ ...styles.button }}>
      <Text subtitle style={styles.text}>
        {title}
      </Text>
    </Pressable>
  </Link>
);

export default NavigatorButton;

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
    letterSpacing: 0.25,
    lineHeight: 21,
  },
});

NavigatorButton.propTypes = {
  pathname: PropTypes.string,
  params: PropTypes.shape({}),
  title: PropTypes.string,
  relativeToDirectory: PropTypes.bool,
};
