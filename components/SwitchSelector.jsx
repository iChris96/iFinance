import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import PropTypes from "prop-types";
import colors from "../consts/colors";

const SwitchSelector = ({ options, selected, onPress }) => (
  <View style={styles.container}>
    {options.map((it) => (
      <Pressable
        key={it.value}
        style={{
          ...styles.item,
          ...(selected === it.value && {
            backgroundColor: it.selectedBackgroundColor,
          }),
        }}
        onPress={() => onPress(it.value)}
      >
        {it.label}
      </Pressable>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderColor: colors.blackLight,
    borderWidth: 1,
    flexDirection: "row",
    height: 50,
  },
  item: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default SwitchSelector;

SwitchSelector.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.element,
      value: PropTypes.string,
    })
  ),
  selected: PropTypes.string,
  onPress: PropTypes.func,
};
