/* eslint-disable operator-linebreak */
/* eslint-disable no-alert */
import { Alert, Platform } from "react-native";

const alertPolyfill = (title, description, options, extra) => {
  if (
    typeof window !== "undefined" &&
    window.confirm([title, description].filter(Boolean).join("\n"))
  ) {
    const confirmOption = options.find(({ style }) => style !== "cancel");
    if (confirmOption) {
      confirmOption.onPress();
    }
  } else {
    const cancelOption = options.find(({ style }) => style === "cancel");
    if (cancelOption) {
      cancelOption.onPress();
    }
  }
};

const alert = Platform.OS === "web" ? alertPolyfill : Alert.alert;

export default alert;
