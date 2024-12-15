import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Link, Stack } from "expo-router";
import colors from "../consts/colors";

const NotFoundScreen = () => (
  <>
    <Stack.Screen options={{ title: "Oops! Not Found" }} />
    <View style={styles.container}>
      <Link href="/" style={styles.button}>
        <Text>Go back to Home screen!</Text>
      </Link>
    </View>
  </>
);

export default NotFoundScreen;

const styles = StyleSheet.create({
  button: {
    color: colors.black,
    fontSize: 20,
    textDecorationLine: "underline",
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.backgroundColorDark,
    flex: 1,
    justifyContent: "center",
  },
});
