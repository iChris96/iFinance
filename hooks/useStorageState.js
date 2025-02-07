import { useEffect, useCallback, useReducer } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

function useAsyncState(initialValue = [true, null]) {
  return useReducer((state, action = null) => [false, action], initialValue);
}

export async function setStorageItemAsync(key, value) {
  try {
    if (Platform.OS === "web") {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } else if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  } catch (e) {
    console.error("Local storage is unavailable:", e);
  }
}

export function useStorageState(key) {
  // Public
  const [state, setState] = useAsyncState();

  // Get
  useEffect(() => {
    try {
      if (Platform.OS === "web") {
        if (typeof localStorage !== "undefined") {
          setState(JSON.parse(localStorage.getItem(key)));
        }
      } else {
        SecureStore.getItemAsync(key).then((value) => {
          setState(JSON.parse(value));
        });
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  }, [key]);

  // Set
  const setValue = useCallback(
    (value) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
