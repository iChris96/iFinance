import React from "react";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import ApiService from "../../network/apiService";
import Text from "../Text";
import Button from "../Button";
import SwitchSelector from "../SwitchSelector";
import colors from "../../consts/colors";
import { EXPENSE, INCOME } from "../../consts/strings";
import TextInput from "../TextInput";

const UpdateTransaction = () => {
  const params = useLocalSearchParams();
  const [title, onChangeTitle] = React.useState(params?.title ?? "");
  const [amount, onChangeAmount] = React.useState(params?.amount ?? "");

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const router = useRouter();

  const [isExpense, setIsExpense] = React.useState(
    params?.type === EXPENSE ? EXPENSE : INCOME
  );

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
          type: isExpense,
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
      <Button
        title="UPDATE TRANSACTION"
        onPress={onPressUpdateTransaction}
        loading={loading}
      />
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default UpdateTransaction;

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

export const expenseIncomeSwitchOptions = [
  {
    label: <Text>EXPENSE</Text>,
    value: EXPENSE,
    selectedBackgroundColor: colors.expense,
    innerHeight: 50,
  },
  {
    label: <Text>INCOME</Text>,
    value: INCOME,
    selectedBackgroundColor: colors.income,
  },
];
