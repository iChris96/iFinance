import { StyleSheet } from "react-native";
import colors from "./colors";

export const headerTitleStyle = { fontFamily: "Montserrat-Bold" };

export const contentStyle = {
  flex: 1,
  width: "100%",
  alignSelf: "center",
  maxWidth: 1000,
};

export const globalStyles = StyleSheet.create({
  addBudgetButton: {
    backgroundColor: colors.addBudgetButtonBackgroundColor,
  },
  addTransactionButton: {
    backgroundColor: colors.addTransactionButtonBackgroundColor,
  },
});
