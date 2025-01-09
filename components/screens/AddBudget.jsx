import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import ApiService from "../../network/apiService";

const AddBudget = () => {
  const [text, onChangeText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const router = useRouter();

  const onPressAddBudget = () => {
    if (!text) {
      setError("Title is missing");
      return;
    }

    const addBudget = async () => {
      setLoading(true);

      try {
        const { id } = await ApiService.postCall("/budgets", { title: text });
        router.replace(
          { pathname: "../budget/[id]", params: { id } },
          { relativeToDirectory: true }
        );
      } catch (err) {
        console.log({ err });
        setError("Network Error");
      } finally {
        setLoading(false);
      }
    };

    addBudget();
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Title"
      />
      <Button title="Add" onPress={onPressAddBudget} />
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default AddBudget;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    height: 40,
    margin: 12,
    padding: 10,
  },
});
