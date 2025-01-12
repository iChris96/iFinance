import React from "react";
import { StyleSheet, Switch, TextInput, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import ApiService from "../../network/apiService";
import Text from "../Text";
import Button from "../Button";

const UpdateTransaction = () => {
  const params = useLocalSearchParams();
  const [title, onChangeTitle] = React.useState(params?.title ?? "");
  const [amount, onChangeAmount] = React.useState(params?.amount ?? "");

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const router = useRouter();

  const [isExpense, setIsExpense] = React.useState(
    params?.type === "EXPENSE" ?? false
  );
  const toggleSwitch = () => setIsExpense((previousState) => !previousState);

  const onPressUpdateTransaction = () => {
    if (!title) {
      setError("Title is missing");
      return;
    }

    const updateBudget = async () => {
      setLoading(true);

      try {
        await ApiService.patchCall(`/transactions/${params.transactionId}`, {
          title,
          amount,
          type: isExpense ? "EXPENSE" : "INCOME",
          budgetId: params.id,
        });
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
    <View style={styles.constainer}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeTitle}
        value={title}
        placeholder="Title"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeAmount}
        value={amount}
        placeholder="Amount"
      />
      <View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isExpense ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isExpense}
        />
        <Text>{isExpense ? "EXPENSE" : "INCOME"}</Text>
      </View>
      <Button title="Update" onPress={onPressUpdateTransaction} />
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default UpdateTransaction;

const styles = StyleSheet.create({
  constainer: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    height: 40,
    marginVertical: 12,
    padding: 10,
  },
});
