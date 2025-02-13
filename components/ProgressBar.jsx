/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Animated } from "react-native";
import colors from "../consts/colors";
import Text from "./Text";

const ProgressBar = ({ total, current }) => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const progressPercentage = (current / total) * 100;
    if (Number.isNaN(progressPercentage)) {
      return;
    }

    Animated.timing(progress, {
      toValue: progressPercentage,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [current, total]);

  useEffect(() => {
    progress.addListener(({ value }) => {
      setProgressValue(value);
    });

    return () => progress.removeAllListeners();
  }, []);

  return (
    <View>
      <View style={styles.subContainer}>
        <Animated.View
          style={[
            styles.bar,
            { width: `${progressValue < 100 ? progressValue : 100}%` },
          ]}
        />
        <View style={{ ...styles.text }}>
          <Text light bold color="white">
            {` ${progressValue.toFixed(0)}%`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.backgroundColorLight,
    borderRadius: 10,
    height: 20,
  },
  subContainer: {
    backgroundColor: colors.backgroundColor,
    borderRadius: 10,
    flexDirection: "row",
    height: 20,
    width: "95%",
  },
  text: {
    alignSelf: "center",
  },
});

export default ProgressBar;
