import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { View } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = useAuthStore((state) => state.signIn);

  const handleLogin = () => {
    const fakeToken = "abc123";
    signIn(fakeToken);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Box className="p-6">
        <VStack space="lg">
          <Text size="3xl" className="self-center">
            iFinances
          </Text>
          <Input variant="rounded" size="lg">
            <InputField
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
          </Input>

          <Input variant="rounded" size="lg">
            <InputField
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </Input>

          <Button onPress={() => handleLogin} size="lg">
            <ButtonText>Login</ButtonText>
          </Button>
        </VStack>
      </Box>
    </View>
  );
}
