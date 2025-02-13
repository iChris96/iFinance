/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable operator-linebreak */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

import colors from "../../consts/colors";
import { EXPENSE, INCOME } from "../../consts/strings";
import { contentStyle, headerTitleStyle } from "../../consts/styles";
import ApiService from "../../network/apiService";
import alert from "../Alert";
import Button from "../Button";
import NavigatorButton from "../NavigatorButton";
import ProgressBar from "../ProgressBar";
import Text from "../Text";
import TransactionItem from "../TransactionItem";

const Budget = () => {
  const { id } = useLocalSearchParams();
  const [budget, setBudget] = React.useState({ title: "", amount: 0 });
  const [transactions, setTransactions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const { incomeSum, expenseSum, balance, fullAmount } = React.useMemo(() => {
    const initialValues = { incomeSum: 0, expenseSum: 0, balance: 0 };

    const result = transactions.reduce((acc, item) => {
      const amount = parseFloat(item.amount) || 0;

      if (item.type === INCOME) {
        acc.incomeSum += amount;
      } else if (item.type === EXPENSE) {
        acc.expenseSum += amount;
      }

      return acc;
    }, initialValues);

    // console.log({ budgetAmount, bmount: parseFloat(budget.amount), result });

    const amountWithExtras = parseFloat(budget.amount) + result.incomeSum;
    result.balance = (amountWithExtras - result.expenseSum).toFixed(2);
    result.fullAmount = amountWithExtras;

    return result;
  }, [transactions, budget]);

  const addTransaction = () =>
    router.push(
      {
        pathname: "./add-transaction",
        params: { id },
      },
      { relativeToDirectory: true }
    );

  const onLongPress = (transactionId) =>
    alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            deleteTransactionCall(transactionId);
          },
        },
      ]
    );

  const deleteTransactionCall = async (transactionId) => {
    try {
      await ApiService.deleteCall(`/transactions/${transactionId}`);
      const responseJson = await getTransactions(id);
      setBudget(responseJson.budget);
      setTransactions(responseJson.transactions);
    } catch (error) {
      console.log({ error });
    }
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
      setIsLoading(true);
      const responseJson = await getTransactions(budgetId);
      setBudget(responseJson.budget);
      setTransactions(responseJson.transactions);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
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

  const isDataLoading = isLoading || !transactions;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "",
          contentStyle,
          headerTitleStyle,
          headerRight: () => (
            <NavigatorButton
              pathname="./update-budget"
              title="Edit"
              params={{ id, title: budget?.title, amount: budget?.amount }}
              relativeToDirectory
            />
          ),
        }}
      />
      <View style={{ ...styles.contentContainer }}>
        <View style={styles.budgetContainer}>
          <View style={styles.budgetWrap}>
            <View style={{ ...styles.titleContainer }}>
              <Text title color="white">
                {budget?.title}
              </Text>
            </View>
            <Text subtitle color="white">
              Budget Amount:
              <Text subtitle color="white" bold>
                {` $${budget?.amount}`}
              </Text>
            </Text>
            <Text subtitle color="white">
              Total Expenses:
              <Text subtitle color="expense" bold>
                {` $${expenseSum}`}
              </Text>
            </Text>
            <Text subtitle color="white">
              Total Incomes:
              <Text subtitle color="income" bold>
                {` $${incomeSum}`}
              </Text>
            </Text>
          </View>
          <View style={{ ...styles.progressBarContainer }}>
            <Text hero color="white">
              {`$${balance} `}
              <Text subtitle color="white" bold>
                {expenseSum > fullAmount ? "over" : "left"}
              </Text>
            </Text>
            <ProgressBar current={expenseSum} total={fullAmount} />
            <Text
              light
              color="white"
            >{`$${expenseSum} of $${fullAmount} spent`}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={addTransaction}
            title="ADD TRANSACTION"
            variant="action"
            width="auto"
          />
        </View>

        {!isDataLoading && (
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
              // eslint-disable-next-line react/jsx-wrap-multilines
              <Text>There are no transactions available yet.</Text>
            }
            style={styles.flatList}
          />
        )}
      </View>
      {isDataLoading && (
        <ActivityIndicator
          size="large"
          color={colors.backgroundColor}
          style={styles.activityIndicator}
        />
      )}
    </View>
  );
};

export default Budget;

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
  },
  budgetContainer: {
    backgroundColor: colors.backgroundColorDark,
    gap: 40,
    padding: 32,
  },
  budgetWrap: {},
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  contentContainer: {
    flex: 1,
  },
  flatList: {
    maxHeight: 600,
    paddingTop: 2,
  },
  progressBarContainer: {
    gap: 4,
  },
  titleContainer: {
    marginBottom: 8,
  },
});

const getTransactions = (budgetId) =>
  ApiService.getCall(`/budgets/${budgetId}`);
