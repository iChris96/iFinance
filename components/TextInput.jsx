/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from "react";
import { StyleSheet, TextInput as TextInputNative } from "react-native";

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
    borderWidth: 1,
    fontFamily: "Montserrat-Regular",
    height: 40,
    margin: 4,
    padding: 10,
  },
});
