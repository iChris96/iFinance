import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { router } from "expo-router";
import { useSession } from "../../store/AuthContext";
import Text from "../Text";
import TextInput from "../TextInput";
import Button from "../Button";
import colors from "../../consts/colors";

const SignIn = () => {
  const { session, signIn } = useSession();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const onChangeEmail = (text) => setEmail(text);
  const onChangePassword = (text) => setPassword(text);

  const onSubmit = async () => {
    const { baseURL } = Constants.expoConfig.extra;
    try {
      setLoading(true);
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

      const { access_token: token, username } = responseJson;
      console.log({ token, username });
      signIn({ token, username });
    } catch (error) {
      console.log({ error });
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (session) {
      router.replace("/app");
    }
  }, [session]);

  console.log("test");

  return (
    <View style={{ ...styles.container }}>
      <View style={{ ...styles.inputContainer }}>
        <View style={{ ...styles.inputWrapper }}>
          <Text hero style={styles.title}>
            iFinance
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="email"
            type="email"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder="password"
            secureTextEntry
            type="password"
          />
          <Button title="LOG IN" onPress={onSubmit} loading={loading} />
          {errorMessage && <Text>{errorMessage}</Text>}
        </View>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 10,
    width: "100%",
  },
  inputContainer: {
    backgroundColor: colors.backgroundColor,
    borderRadius: 4,
    maxWidth: 700,
    padding: 24,
    width: "100%",
  },
  inputWrapper: {
    alignSelf: "center",
    maxWidth: 450,
    width: "100%",
  },
  title: {
    marginBottom: 14,
  },
});
