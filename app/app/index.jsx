import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useSession } from "../../store/AuthContext";
import colors from "../../consts/colors";

const Index = () => {
  const { signOut } = useSession();

  return (
    <View>
      <Link href="/app/profile" style={styles.button}>
        <Text> Go to Profile</Text>
      </Link>
      <Text onPress={signOut}>Sign Out</Text>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  button: {
    color: colors.black,
    fontSize: 20,
    textDecorationLine: "underline",
  },
});
