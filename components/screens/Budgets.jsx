import { router, useFocusEffect } from "expo-router";
import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import colors from "../../consts/colors";
import { ITEM_HEIGHT } from "../../consts/sizes";
import ApiService from "../../network/apiService";
import Text from "../Text";
import Button from "../Button";
import alert from "../Alert";

const getData = async () => ApiService.getCall("/budgets");

const Budgets = () => {
  const [budgets, setBudgets] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const addBudget = () => {
    router.push(
      {
        pathname: "app/home/add-budget",
      },
      { relativeToDirectory: true }
    );
  };
  const onPress = (id) => {
    router.push(
      {
        pathname: "app/home/budget/[id]",
        params: { id },
      },
      { relativeToDirectory: true }
    );
  };

  const onLongPress = (id) =>
    alert("Delete Budget", "Are you sure?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => deleteBudgetCall(id),
      },
    ]);

  const deleteBudgetCall = async (id) => {
    try {
      await ApiService.deleteCall(`/budgets/${id}`);
      const data = await getData();
      setBudgets(data);
    } catch (error) {
      console.log({ error });
    }
  };

  const getBudgets = async () => {
    try {
      const data = await getData();
      setBudgets(data);
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBudgets();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getBudgets();
    }, [])
  );

  if (loading && !budgets) {
    return (
      <ActivityIndicator
        size="large"
        color={colors.backgroundColor}
        style={styles.activityIndicator}
      />
    );
  }

  return (
    <View style={{ ...styles.container }}>
      <View style={{ ...styles.headerContainer }}>
        <Button
          onPress={addBudget}
          title="ADD BUDGET"
          variant="action"
          width="auto"
        />
      </View>
      <View style={{ ...styles.flatListContainer }}>
        <FlatList
          data={budgets}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => onPress(item.id)}
              onLongPress={() => onLongPress(item.id)}
            >
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text>There are no budgets available yet.</Text>}
          style={styles.flatList}
        />
      </View>
    </View>
  );
};

export default Budgets;

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
  },
  container: {
    height: "100%",
    justifyContent: "space-evenly",
  },
  flatList: {
    paddingTop: 32,
  },
  flatListContainer: {
    flex: 1,
    padding: 8,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  item: {
    alignItems: "center",
    backgroundColor: colors.backgroundColorDark,
    borderRadius: 6,
    height: ITEM_HEIGHT,
    justifyContent: "center",
    marginBottom: 6,
    marginHorizontal: 4,
    padding: 8,
  },
  title: {
    color: colors.white,
  },
});
