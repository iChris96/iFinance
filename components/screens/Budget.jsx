/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import colors from "../../consts/colors";
import { headerTitleStyle } from "../../consts/styles";
import ApiService from "../../network/apiService";
import NavigatorButton from "../NavigatorButton";
import TransactionItem from "../TransactionItem";
import Text from "../Text";
import Button from "../Button";
import { EXPENSE, INCOME } from "../../consts/strings";

const Budget = () => {
  const { id } = useLocalSearchParams();
  const [budget, setBudget] = React.useState();
  const [transactions, setTransactions] = React.useState([]);

  const { incomeSum, expenseSum, balance } = React.useMemo(
    () =>
      transactions.reduce(
        (acc, item) => {
          const amount = parseFloat(item.amount) || 0;
          if (item.type === INCOME) {
            acc.incomeSum += amount;
          } else if (item.type === EXPENSE) {
            acc.expenseSum += amount;
          }
          acc.balance = acc.incomeSum - acc.expenseSum;
          return acc;
        },
        { incomeSum: 0, expenseSum: 0, balance: 0 }
      ),
    [transactions]
  );

  const addTransaction = () =>
    router.push(
      {
        pathname: "./add-transaction",
        params: { id },
      },
      { relativeToDirectory: true }
    );

  const onLongPress = (transactionId) => {
    const deleteTransactionCall = async () => {
      try {
        await ApiService.deleteCall(`/transactions/${transactionId}`);
        const responseJson = await getTransactions(id);
        setBudget(responseJson.budget);
        setTransactions(responseJson.transactions);
      } catch (error) {
        console.log({ error });
      }
    };

    deleteTransactionCall();
  };

  const onPress = (item) => {
    const { title, amount, type } = item;
    router.push(
      {
        pathname: "./update-transaction",
        params: { transactionId: item.id, title, amount, type },
      },
      { relativeToDirectory: true }
    );
  };

  const getBudget = async (budgetId) => {
    try {
      const responseJson = await getTransactions(budgetId);
      setBudget(responseJson.budget);
      setTransactions(responseJson.transactions);
    } catch (error) {
      console.log({ error });
    }
  };

  React.useEffect(() => {
    getBudget(id);
  }, [id]);

  useFocusEffect(
    React.useCallback(() => {
      getBudget(id);
    }, [])
  );

  if (!budget) return <Text light>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          contentStyle: { backgroundColor: colors.white },
          headerTitleStyle,
          title: `Budget: ${id}`,
          headerRight: () => (
            <NavigatorButton
              pathname="./update-budget"
              title="Edit"
              params={{ id, title: budget?.title }}
              relativeToDirectory
            />
          ),
        }}
      />
      <View style={styles.budgetContainer}>
        <Text title color="white">
          {budget.title}
        </Text>
        <Text subtitle color="grey">
          {`Total Incomes: ${incomeSum} $`}
        </Text>
        <Text subtitle color="grey">
          {`Total Expenses: ${expenseSum} $`}
        </Text>
        <Text subtitle color="grey">
          {`Balance: ${balance} $`}
        </Text>
      </View>

      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <TransactionItem
            transaction={item}
            onLongPress={() => onLongPress(item.id)}
            onPress={() => onPress(item)}
          />
        )}
        ListEmptyComponent={
          <Text>There are no transactions available yet.</Text>
        }
        style={styles.flatList}
      />
      <View style={styles.buttonContainer}>
        <Button
          onPress={addTransaction}
          title="NEW TRANSACTION"
          type="primary"
        />
      </View>
    </View>
  );
};

export default Budget;

const styles = StyleSheet.create({
  budgetContainer: {
    backgroundColor: colors.budgetBackground,
    padding: 20,
  },
  buttonContainer: {
    justifyContent: "center",
    marginBottom: 12,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  flatList: {
    maxHeight: 600,
    paddingTop: 4,
  },
});

const getTransactions = (budgetId) =>
  ApiService.getCall(`/budgets/${budgetId}`);
