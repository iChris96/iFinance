import { router, useFocusEffect } from "expo-router";
import React, { useEffect } from "react";
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
import { useSession } from "../../store/AuthContext";

const getData = async () => ApiService.getCall("/budgets");

// eslint-disable-next-line react/prop-types
const Budget = ({ title, onPress, onLongPress }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={onPress}
    onLongPress={onLongPress}
  >
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

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
          <Budget
            title={item.title}
            onPress={() => onPress(item.id)}
            onLongPress={() => onLongPress(item.id)}
          />
        )}
        style={styles.flatList}
      />

      <Button onPress={addBudget} title="Add" />
      <Button onPress={signOut} title="Sign Out" />
    </View>
  );
};

export default Budgets;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-between",
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
    fontSize: 20,
  },
});
