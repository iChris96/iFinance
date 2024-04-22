import AsyncStorage from "@react-native-async-storage/async-storage";

export const getValueFromStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@MyApp:myValue");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error getting value from store", error);
    return "";
  }
};

export const handleSaveValue = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@MyApp:myValue", jsonValue);
    console.log("Data saved successfully:", jsonValue);
  } catch (error) {
    console.error("Error saving value:", error);
  }
};
