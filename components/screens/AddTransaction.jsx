import React from "react";
import {
  Button,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import ApiService from "../../network/apiService";

const AddTransaction = () => {
  const [title, onChangeTitle] = React.useState("");
  const [amount, onChangeAmount] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const router = useRouter();

  const [isExpense, setIsExpense] = React.useState(true);
  const toggleSwitch = () => setIsExpense((previousState) => !previousState);

  const { id } = useLocalSearchParams();

  const onPressAddTransaction = () => {
    if (!title) {
      setError("Title is missing");
      return;
    }

    const addBudget = async () => {
      setLoading(true);

      try {
        await ApiService.postCall("/transactions", {
          title,
          amount,
          type: isExpense ? "EXPENSE" : "INCOME",
          budgetId: id,
        });
        router.back();
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
      <Button title="Add" onPress={onPressAddTransaction} />
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default AddTransaction;

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
