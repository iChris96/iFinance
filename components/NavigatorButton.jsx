import { Link } from "expo-router";
import PropTypes from "prop-types";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import colors from "../consts/colors";

const NavigatorButton = ({
  title = "Navigate",
  href,
  params,
  backgroundColor = "black",
}) => (
  <Link href={{ pathname: href, params }} asChild>
    <Pressable style={{ ...styles.button, backgroundColor }}>
      <Text style={styles.text}>{title}</Text>
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
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.25,
    lineHeight: 21,
  },
});

NavigatorButton.propTypes = {
  href: PropTypes.string.isRequired,
  params: PropTypes.string,
  backgroundColor: PropTypes.string,
  title: PropTypes.string,
};
