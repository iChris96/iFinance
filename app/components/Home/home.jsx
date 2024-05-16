import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import colors from "../../consts/colors";
import { textStyles } from "../../consts/text";
import Button from "../button";
import BillItem from "./billItem";

export default function Home() {
  const myBills = [
    {
      id: "01",
      title: "Amx Plat",
      created: "09/01/2023",
      state: "open",
    },
    {
      id: "02",
      title: "Amx Green",
      created: "09/01/2023",
      state: "archive",
    },
    {
      id: "02",
      title: "Amx Gold Octubre",
      created: "09/01/2023",
      state: "archive",
    },
    {
      id: "03",
      title: "NU Mayo",
      created: "09/01/2023",
      state: "archive",
    },
    {
      id: "03",
      title: "NU Abril",
      created: "09/01/2023",
      state: "archive",
    },
  ];

  const onPressItem = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={textStyles.boldText}>Finances App</Text>
      </View>
      <View style={styles.gridListContainer}>
        <View style={styles.gridListSubContainer}>
          <FlatList
            data={myBills}
            numColumns={2}
            renderItem={({ item }) => (
              <BillItem bill={item} onPress={onPressItem} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Button title="Create new billing" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.backgroundColorLight,
  },
  gridListContainer: {
    flex: 1,
  },
  gridListSubContainer: {
    flex: 1,
    padding: 10,
  },
  header: {
    backgroundColor: colors.statusBar,
    height: 120,
    alignItems: "center",
  },
  footer: {
    padding: 10,
    gap: 4,
  },
});
