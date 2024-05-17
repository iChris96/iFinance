import React from "react";
import { StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import PropTypes from "prop-types";
import colors from "../../consts/colors";

const BillItem = ({ bill, onPress }) => {
  const { title } = bill;
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(bill)}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

BillItem.propTypes = {
  bill: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 8,
    flex: 1,
    height: 80,
    margin: 5,
    padding: 10,
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
