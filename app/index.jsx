import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useMemo } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "./consts/colors";
import RecordContext from "./store/RecordContext";
import NavigatorButton from "./components/navigatorButton";
import Spinner from "./components/spinner";

export default function App({}) {
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
                <Text
                  style={{ color: "white", fontWeight: "bold" }}
                >{`${it.title} - ${it.amount}$`}</Text>
              </Pressable>
            </View>
          ))}
      </ScrollView>
      <View>
        <NavigatorButton href="/record" title="New Record" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: "center",
    justifyContent: "top",
  },
  listContainer: {
    marginVertical: 20,
    width: "100%",
    maxHeight: 400,
    overflow: "scroll",
  },
  sumaryContainer: {
    padding: 40,
  },
});
