import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "./components/button";
import colors from "./consts/colors";
import RecordContext from "./store/RecordContext";

const RecordView = () => {
  const [text, onChangeText] = React.useState("");
  const [number, onChangeNumber] = React.useState("");
  const navigation = useNavigation();
  const { newRecord } = useContext(RecordContext);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ width: "100%", padding: 10 }}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          onChangeText={onChangeText}
          value={text}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          onChangeText={onChangeNumber}
          value={number}
        />
      </View>
      <Button
        onPress={() => {
          newRecord(text, number);
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};

export default RecordView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  input: {
    margin: 12,
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
});
