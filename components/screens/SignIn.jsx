import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import Constants from "expo-constants";
import { router } from "expo-router";
import { useSession } from "../../store/AuthContext";

const SignIn = () => {
  const { session, signIn } = useSession();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const onChangeEmail = (text) => setEmail(text);
  const onChangePassword = (text) => setPassword(text);
  const onSubmit = async () => {
    const { baseURL } = Constants.expoConfig.extra;
    try {
      const body = { email, password };
      const response = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (![200, 201].includes(response.status)) {
        throw new Error("Invalid Credentials");
      }
      const responseJson = await response.json();

      const { access_token: token } = responseJson;
      signIn(token);
    } catch (error) {
      console.log({ error });
      setErrorMessage(error.message);
    }
  };

  React.useEffect(() => {
    if (session) {
      router.replace("/app");
    }
  }, [session]);

  return (
    <View style={{ ...styles.container }}>
      <Text style={styles.title}>iFinance</Text>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="email"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="password"
          secureTextEntry
        />
        <Button title="Submit" onPress={onSubmit} />
        {errorMessage && <Text>{errorMessage}</Text>}
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  input: {
    borderWidth: 1,
    height: 40,
    margin: 12,
    padding: 10,
  },
  title: { alignSelf: "center", fontSize: 28 },
});
