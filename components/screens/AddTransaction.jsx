import React from "react";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import ApiService from "../../network/apiService";
import Text from "../Text";
import Button from "../Button";
import SwitchSelector from "../SwitchSelector";
import { expenseIncomeSwitchOptions } from "./UpdateTransaction";
import { EXPENSE } from "../../consts/strings";
import TextInput from "../TextInput";
import { globalStyles } from "../../consts/styles";
import colors from "../../consts/colors";

const AddTransaction = () => {
  const [title, onChangeTitle] = React.useState("");
  const [amount, onChangeAmount] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const router = useRouter();

  const [isExpense, setIsExpense] = React.useState(EXPENSE);

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
          type: isExpense,
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

  return (
    <View style={styles.constainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTitle}
          value={title}
          placeholder="Title"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeAmount(text.replace(/[^0-9]/g, ""))}
          maxLength={8}
          value={amount}
          placeholder="Amount"
          keyboardType="numeric"
        />
        <SwitchSelector
          options={expenseIncomeSwitchOptions}
          selected={isExpense}
          onPress={(value) => setIsExpense(value)}
        />
      </View>
      <View>
        <Button
          title="ADD TRANSACTION"
          onPress={onPressAddTransaction}
          loading={loading}
          hoveredColor={colors.addTransactionButtonHoverColor}
          style={globalStyles.addTransactionButton}
        />
        {error && <Text>{error}</Text>}
      </View>
    </View>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
  },
  input: {
    borderWidth: 1,
    height: 40,
    marginBottom: 12,
    padding: 10,
  },
  inputContainer: {
    marginBottom: 12,
  },
});
