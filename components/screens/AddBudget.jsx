import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import ApiService from "../../network/apiService";
import Button from "../Button";
import Text from "../Text";
import TextInput from "../TextInput";

const AddBudget = () => {
  const [title, setTitle] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const router = useRouter();

  const onPressAddBudget = () => {
    if (!title) {
      setError("Title is missing");
      return;
    }

    if (!amount) {
      setError("Amount is missing");
      return;
    }

    const addBudget = async () => {
      setLoading(true);

      try {
        const { id } = await ApiService.postCall("/budgets", {
          title,
          amount: parseFloat(amount).toFixed(2),
        });
        router.replace(
          { pathname: "../budget/[id]", params: { id } },
          { relativeToDirectory: true }
        );
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
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setTitle}
          value={title}
          placeholder="Title"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setAmount(
              text.replace(/[^0-9.]/g, "").replace(/(\.\d{2})\d+/g, "$1")
            );
          }}
          maxLength={8}
          value={amount}
          placeholder="Amount"
          keyboardType="numeric"
        />
      </View>
      <View>
        <Button
          title="ADD BUDGET"
          onPress={onPressAddBudget}
          loading={loading}
          variant="action"
        />
        {error && <Text>{error}</Text>}
      </View>
    </View>
  );
};

export default AddBudget;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
  },
  input: {
    borderWidth: 1,
    height: 40,
    margin: 12,
    padding: 10,
  },
});
