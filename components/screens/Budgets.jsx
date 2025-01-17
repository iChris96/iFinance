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
import ApiService from "../../network/apiService";
import { useSession } from "../../store/AuthContext";
import Text from "../Text";
import Button from "../Button";
import alert from "../Alert";

const getData = async () => ApiService.getCall("/budgets");

const Budgets = () => {
  const { signOut } = useSession();
  const [budgets, setBudgets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const addBudget = () => {
    router.push({ pathname: "./add-budget" }, { relativeToDirectory: true });
  };
  const onPress = (id) => {
    router.push(`app/budget/${id}`);
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

  if (loading) {
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
  activityIndicator: {
    flex: 1,
  },
  container: {
    height: "100%",
    justifyContent: "space-between",
    paddingBottom: 16,
  },
  flatList: {
    paddingTop: 4,
  },
  item: {
    backgroundColor: colors.backgroundColor,
    borderRadius: 6,
    marginBottom: 4,
    marginHorizontal: 4,
    padding: 20,
  },
  title: {
    color: colors.white,
  },
});
