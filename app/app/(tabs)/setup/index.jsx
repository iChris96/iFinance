import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "../../../../components/Button";
import { useSession } from "../../../../store/AuthContext";
import Text from "../../../../components/Text";

const SettingsScreen = () => {
  const { session, signOut } = useSession();

  return (
    <View style={styles.container}>
      <Text subtitle>{`Hello ${session?.username}!`}</Text>
      <Button onPress={signOut} title="SIGN OUT" variant="secondary" />
    </View>
  );
};
export default SettingsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "space-between", padding: 10 },
});
