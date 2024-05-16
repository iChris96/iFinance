import { SafeAreaView, StyleSheet } from "react-native";
import Home from "./components/Home/home";

export default function App() {
  return (
    <SafeAreaView style={{ ...styles.container }}>
      <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
