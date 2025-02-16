/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from "react";
import { StyleSheet, TextInput as TextInputNative } from "react-native";
import colors from "../consts/colors";

const TextInput = ({ children, style = {}, ...props }) => {
  const dynamicStyle = {
    ...styles.input,
    ...style,
  };
  return <TextInputNative {...props} style={dynamicStyle} />;
};

export default TextInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.white,
    borderRadius: 4,
    borderWidth: 1,
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    height: 40,
    marginVertical: 4,
    padding: 10,
  },
});
