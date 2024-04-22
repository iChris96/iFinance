import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const NavigatorButton = (props) => {
  const { title = "Navigate", href, params, backgroundColor = "black" } = props;
  return (
    <Link href={{ pathname: href, params }} asChild>
      <Pressable style={{ ...styles.button, backgroundColor }}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </Link>
  );
};

export default NavigatorButton;

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
