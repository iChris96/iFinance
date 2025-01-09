import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import colors from "../consts/colors";

const TransactionItem = ({ transaction, onPress, onLongPress }) => (
  <TouchableOpacity
    style={{
      ...styles.item,
      backgroundColor:
        transaction?.type === "EXPENSE"
          ? colors.backgroundColor
          : colors.warning,
    }}
    onPress={onPress}
    onLongPress={onLongPress}
  >
    <Text style={styles.title}>{transaction.title}</Text>
    <View style={styles.detailsContainer}>
      <Text style={styles.title}>{`${transaction.amount}$`}</Text>
      <Text style={styles.subtitle}>{transaction.type}</Text>
    </View>
  </TouchableOpacity>
);
export default TransactionItem;

const styles = StyleSheet.create({
  detailsContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    marginBottom: 4,
    padding: 8,
  },
  subtitle: {
    fontSize: 14,
  },
  title: {
    fontSize: 18,
  },
});

TransactionItem.propTypes = {
  transaction: PropTypes.shape({
    title: PropTypes.string,
    type: PropTypes.string,
    amount: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
};
