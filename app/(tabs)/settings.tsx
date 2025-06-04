import { View, Text, StyleSheet } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

export default function SettingsScreen() {
  const logout = useAuthStore((state) => state.signOut);

  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Button onPress={() => logout()} size="lg">
        <ButtonText>Logout</ButtonText>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
