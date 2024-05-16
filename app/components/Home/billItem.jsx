import React from "react";
import { StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import colors from "../../consts/colors";

const BillItem = ({ bill }) => {
  const { title } = bill;
  return (
    <TouchableOpacity style={styles.container} onPress={() => {}}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 10,
    margin: 5,
    height: 80,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

export default BillItem;
