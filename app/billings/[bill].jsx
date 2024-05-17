import { StatusBar } from "expo-status-bar";
import { useContext, useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigatorButton from "../components/navigatorButton";
import Spinner from "../components/spinner";
import colors from "../consts/colors";
import RecordContext from "../store/RecordContext";
import { useLocalSearchParams } from "expo-router";

const BillPage = () => {
  const { bill } = useLocalSearchParams();
  const { records, removeRecord, isSaving } = useContext(RecordContext);

  const summary = useMemo(() => {
    return records.reduce((acc, record) => acc + parseInt(record.amount), 0);
  }, [records]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Spinner visible={isSaving} />
      <View style={styles.sumaryContainer}>
        <Text
          style={{ fontSize: 30, fontStyle: "italic" }}
        >{`Summary ${summary}$`}</Text>
      </View>
      <Text>Blog post: {bill.toString()}</Text>
      <ScrollView style={styles.listContainer}>
        {records &&
          records.map((it) => (
            <View
              key={it.id}
              style={{
                padding: 20,
                margin: 1,
                backgroundColor: colors.backgroundColorDark,
                alignItems: "center",
              }}
            >
              <Pressable onLongPress={() => removeRecord(it)}>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ color: "white", fontWeight: "bold" }}
                  >{`${it.title}`}</Text>
                  <Text
                    style={{ color: "white", fontWeight: "bold" }}
                  >{`${it.amount}$`}</Text>
                </View>
              </Pressable>
            </View>
          ))}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
          padding: 4,
        }}
      >
        <NavigatorButton
          href="/record"
          title="New Income"
          params={{
            mode: "income",
            headerTitle: "New Income",
            bg: colors.success,
            saveButtonTitle: "Save Income",
          }}
          backgroundColor={colors.success}
        />
        <NavigatorButton
          href="/record"
          title="New Expense"
          params={{
            mode: "expense",
            headerTitle: "New Expense",
            bg: colors.warning,
            saveButtonTitle: "Save Expense",
          }}
          backgroundColor={colors.warning}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "space-between",
  },
  listContainer: {
    marginVertical: 20,
    maxHeight: 400,
    overflow: "scroll",
    width: "100%",
  },
  sumaryContainer: {
    padding: 40,
  },
});

export default BillPage;
