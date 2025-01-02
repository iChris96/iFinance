import { router } from "expo-router";
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
    router.push("app/add-budget");
  };
  const onPress = (id) => {
    console.log(id);
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

  useEffect(() => {
    const getBudgets = async () => {
      try {
        const data = await getData();

        setBudgets(data);
      } catch (error) {
        console.log({ error });
      }
    };

    getBudgets();
  }, []);

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
  item: {
    backgroundColor: colors.purple,
    marginBottom: 2,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});
