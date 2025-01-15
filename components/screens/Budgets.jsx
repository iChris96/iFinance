import { router, useFocusEffect } from "expo-router";
import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import colors from "../../consts/colors";
import ApiService from "../../network/apiService";
import { useSession } from "../../store/AuthContext";
import Text from "../Text";
import Button from "../Button";

const getData = async () => ApiService.getCall("/budgets");

const Budgets = () => {
  const { signOut } = useSession();
  const [budgets, setBudgets] = React.useState([]);

  const addBudget = () => {
    router.push({ pathname: "./add-budget" }, { relativeToDirectory: true });
  };
  const onPress = (id) => {
    router.push(`app/budget/${id}`);
  };

  const onLongPress = (id) => {
    const deleteBudgetCall = async () => {
      try {
        await ApiService.deleteCall(`/budgets/${id}`);
        const data = await getData();
        setBudgets(data);
      } catch (error) {
        console.log({ error });
      }
    };

    deleteBudgetCall();
  };

  const getBudgets = async () => {
    try {
      const data = await getData();
      setBudgets(data);
    } catch (error) {
      console.log({ error });
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

  return (
    <View style={{ ...styles.container }}>
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
      <Button onPress={addBudget} title="NEW BUDGET" />
      <Button onPress={signOut} title="SIGN OUT" type="secondary" />
    </View>
  );
};

export default Budgets;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-between",
    paddingBottom: 16,
  },
  flatList: {
    paddingTop: 4,
  },
  item: {
    backgroundColor: colors.budgetBackground,
    borderRadius: 6,
    marginBottom: 4,
    marginHorizontal: 4,
    padding: 20,
  },
  title: {
    color: colors.white,
  },
});
