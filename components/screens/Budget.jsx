/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import { router, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "../../consts/colors";
import ApiService from "../../network/apiService";
import NavigatorButton from "../NavigatorButton";

const getTransactions = (budgetId) =>
  ApiService.getCall(`/budgets/${budgetId}`);

const Transaction = ({ transaction, onPress, onLongPress }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={onPress}
    onLongPress={onLongPress}
  >
    <Text style={styles.title}>{transaction.title}</Text>
    <Text style={styles.title}>{transaction.type}</Text>
    <Text style={styles.title}>{`${transaction.amount} $`}</Text>
    <Text style={styles.title}>{`${transaction.state} $`}</Text>
  </TouchableOpacity>
);

const TransactionList = ({ transactions, onLongPress, onPress }) => {
  // eslint-disable-next-line react/prop-types
  if (transactions.length === 0) {
    return <Text>Loading Transactions...</Text>;
  }

  return (
    <FlatList
      data={transactions}
      renderItem={({ item }) => (
        <Transaction
          transaction={item}
          onLongPress={() => onLongPress(item.id)}
          onPress={() => onPress(item)}
        />
      )}
    />
  );
};

const Budget = () => {
  const { id } = useLocalSearchParams();
  const [budget, setBudget] = React.useState();
  const [transactions, setTransactions] = React.useState([]);

  const { incomeSum, expenseSum, balance } = React.useMemo(
    () =>
      transactions.reduce(
        (acc, item) => {
          const amount = parseFloat(item.amount) || 0;
          if (item.type === "INCOME") {
            acc.incomeSum += amount;
          } else if (item.type === "EXPENSE") {
            acc.expenseSum += amount;
          }
          acc.balance = acc.incomeSum - acc.expenseSum;
          return acc;
        },
        { incomeSum: 0, expenseSum: 0, balance: 0 }
      ),
    [transactions]
  );

  const addTransaction = () => {
    router.push(
      {
        pathname: "./add-transaction",
        params: { id },
      },
      { relativeToDirectory: true }
    );
  };

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

  React.useEffect(() => {
    const getBudget = async (budgetId) => {
      try {
        const responseJson = await getTransactions(budgetId);
        setBudget(responseJson.budget);
        setTransactions(responseJson.transactions);
      } catch (error) {
        console.log({ error });
      }
    };

    getBudget(id);
  }, [id]);

  if (!budget) return <Text>Loading...</Text>;

  return (
    <View>
      <Stack.Screen
        options={{
          contentStyle: { backgroundColor: colors.white },
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
        <Text style={styles.title}>{budget.title}</Text>
        <Text style={styles.subtitle}>{`Total Incomes: ${incomeSum} $`}</Text>
        <Text style={styles.subtitle}>{`Total Expenses: ${expenseSum} $`}</Text>
        <Text style={styles.subtitle}>{`Balance: ${balance} $`}</Text>
      </View>
      <TransactionList
        transactions={transactions}
        onLongPress={onLongPress}
        onPress={onPress}
      />
      <Button onPress={addTransaction} title="Add" />
    </View>
  );
};

export default Budget;

const styles = StyleSheet.create({
  budgetContainer: {
    backgroundColor: colors.purple,
    // borderRadius: 10,
    // margin: 10,
    padding: 20,
  },
  item: {
    backgroundColor: colors.backgroundColor,
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
  },
  title: {
    fontSize: 26,
  },
});
