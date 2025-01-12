/* eslint-disable react/prop-types */
import React from "react";
import { StyleSheet, Text as TextNative } from "react-native";
import colors from "../consts/colors";

const Text = ({ children, style = {}, color = "black", ...props }) => {
  const dynamicStyle = {
    ...styles.text,
    ...(props.light && styles.light),
    ...(props.subtitle && styles.subtitle),
    ...(props.title && styles.title),
    ...(props.hero && styles.hero),
    ...{ color: colors[color] },
    ...style,
  };
  return <TextNative style={dynamicStyle}>{children}</TextNative>;
};

export default Text;

const styles = StyleSheet.create({
  hero: {
    alignSelf: "center",
    fontSize: 38,
  },
  light: {
    fontFamily: "Montserrat-Light",
  },
  subtitle: {
    fontSize: 18,
  },
  text: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 22,
  },
});
