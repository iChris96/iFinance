import { useLocalSearchParams, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "./components/button";
import colors from "./consts/colors";
import RecordContext from "./store/RecordContext";

const RecordView = () => {
  const [title, onChangeTitle] = useState("");
  const [number, onChangeNumber] = useState("");
  const navigation = useNavigation();
  const { newRecord } = useContext(RecordContext);

  const params = useLocalSearchParams();
  const { mode, headerTitle, bg, saveButtonTitle } = params;

  React.useEffect(() => {
    navigation.setOptions({
      title: headerTitle,
    });
  }, [navigation]);

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: bg,
      }}
    >
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ width: "100%", padding: 10 }}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            onChangeText={onChangeTitle}
            value={title}
            placeholderTextColor={colors.grey}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            onChangeText={onChangeNumber}
            value={number}
            placeholderTextColor={colors.grey}
          />
        </View>

        <Button
          onPress={() => {
            if (number.length && title.length) {
              newRecord(title, number, mode);
            }
            navigation.goBack();
          }}
          title={saveButtonTitle}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RecordView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    width: "100%",
  },
  input: {
    margin: 12,
    height: 40,
    borderWidth: 1,
    padding: 10,
    backgroundColor: colors.transparentDark,
    color: "white",
    borderRadius: 8,
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
