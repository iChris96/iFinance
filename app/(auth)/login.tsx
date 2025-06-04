import { useRef, useState } from "react";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { TextInput, View } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useCustomToast } from "@/hooks/useCustomToast";
import { useAuthStore } from "@/store/authStore";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const signIn = useAuthStore((state) => state.signIn);
  const token = useAuthStore((state) => state.token);
  console.log("Current token:", token);

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Login success", data);
      toast.showToast({
        title: "Login successful",
        description: "Welcome back!",
      });
      signIn(data.access_token);
    },
    onError: (error: any) => {
      console.error("Login error", error);
      toast.showToast(
        {
          title: "Login failed",
          description: "An unexpected error occurred.",
        },
        "error"
      );
    },
  });
  const toast = useCustomToast();
  const passwordRef = useRef<TextInput>(null);

  const handleLogin = () => {
    setErrors({});
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "email") fieldErrors.email = err.message;
        if (err.path[0] === "password") fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    mutate(result.data);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Box className="p-6">
        <VStack space="lg">
          <Text size="3xl" className="self-center">
            iFinances
          </Text>
          <Text className="text-center text-gray-500">{token}</Text>
          <Input variant="rounded" size="lg">
            <InputField
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              onSubmitEditing={() => passwordRef.current?.focus()}
              returnKeyType="next"
            />
          </Input>
          {errors.email && <Text className="text-red-500">{errors.email}</Text>}

          <Input variant="rounded" size="lg">
            <InputField
              ref={passwordRef as React.Ref<any>}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              returnKeyType="next"
              onSubmitEditing={handleLogin}
            />
          </Input>
          {errors.password && (
            <Text className="text-red-500">{errors.password}</Text>
          )}

          <Button onPress={() => handleLogin()} size="lg" disabled={isPending}>
            {isPending ? (
              <>
                <ButtonSpinner />
                <ButtonText className="ml-2">Logging in...</ButtonText>
              </>
            ) : (
              <ButtonText>Log in</ButtonText>
            )}
          </Button>
        </VStack>
      </Box>
    </View>
  );
}

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

async function loginRequest(data: { email: string; password: string }) {
  // Simulate a login request with a delay, ignore email & password for now
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, user: { email: data.email } });
    }, 1000);
  });
}

// simulate a loginrequesterror that will be caught by the mutate onerror handler
async function loginRequestError(data: { email: string; password: string }) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Login failed"));
    }, 1000);
  });
}

async function login(data: { email: string; password: string }) {
  try {
    const endpoint = "http://localhost:3000/auth/login";
    const body = JSON.stringify(data);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();

    if (!responseData.access_token) {
      throw new Error(responseData.message || "Login failed");
    }

    return responseData;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
