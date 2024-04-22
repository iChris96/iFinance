import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import colors from "../consts/colors";

export default function Button(props) {
  const {
    onPress,
    title = "Save",
    disabled = false,
    backgroundColor = colors.black,
  } = props;
  return (
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
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
