import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import ApiService from "../../network/apiService";
import Text from "../Text";
import Button from "../Button";

const UpdateBudget = () => {
  const { id, title } = useLocalSearchParams();
  const [text, onChangeText] = React.useState(title ?? "");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const router = useRouter();

  const onPressUpdateBudget = () => {
    if (!text) {
      setError("Title is missing");
      return;
    }

    const updateBudget = async () => {
      setLoading(true);

      try {
        await ApiService.patchCall(`/budgets/${id}`, { title: text });
        router.back();
      } catch (err) {
        console.log({ err });
        setError("Network Error");
      } finally {
        setLoading(false);
      }
    };

    updateBudget();
  };

  if (loading) {
    return <Text light>Loading...</Text>;
  }

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Title"
      />
      <Button title="Update" onPress={onPressUpdateBudget} />
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default UpdateBudget;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    height: 40,
    margin: 12,
    padding: 10,
  },
});
