import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import Constants from "expo-constants";

const App = () => {
  const [user, setUser] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const onChangeEmail = (text) => setEmail(text);
  const onChangePassword = (text) => setPassword(text);
  const onSubmit = async () => {
    const { protocol, port } = Constants.expoConfig.extra;
    try {
      const body = { email, password };
      const response = await fetch(
        `${protocol}://localhost:${port}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const responseJson = await response.json();
      const { access_token: token } = responseJson;
      setUser(token);
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <View style={{ ...styles.container }}>
      <Text>{`User: ${user}`}</Text>
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
      </View>
    </View>
  );
};

export default App;

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
});
