import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import colors from "../consts/colors";
import Text from "./Text";
import { EXPENSE } from "../consts/strings";
import Ship from "./Ship";

const TransactionItem = ({ transaction, onPress, onLongPress }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={onPress}
    onLongPress={onLongPress}
  >
    <View style={styles.itemContainer}>
      <Text subtitle>{transaction.title}</Text>
      <View style={styles.detailsContainer}>
        <Text
          subtitle
          style={{
            ...styles.amount,
          }}
        >
          {`${transaction.type === EXPENSE ? "-" : ""}${transaction.amount}$`}
        </Text>
        <Ship
          color={transaction.type === EXPENSE ? colors.expense : colors.income}
        >
          <Text>{transaction.type}</Text>
        </Ship>
      </View>
    </View>
  </TouchableOpacity>
);
export default TransactionItem;

const styles = StyleSheet.create({
  amount: {
    borderRadius: 4,
    fontSize: 18,
  },
  detailsContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    alignItems: "center",
    marginBottom: 2,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    padding: 16,
    width: "98%",
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
