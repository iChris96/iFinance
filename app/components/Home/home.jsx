import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import colors from "../../consts/colors";
import { PATHS, buildPath } from "../../consts/paths";
import { textStyles } from "../../consts/text";
import BillingController from "../../controllers/billingController";
import useNavigation from "../../hooks/useNavigation";
import Button from "../button";
import BillItem from "./billItem";

const Home = () => {
  const [billingItems, setBillingItems] = useState([]);
  const { navigateWithPath } = useNavigation();

  const onPressItem = (bill) => {
    navigateWithPath(buildPath(PATHS.BILL, bill.id));
  };

  useEffect(() => {
    setBillingItems(BillingController.getAllItems());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={textStyles.boldText}>Finances App</Text>
      </View>
      <View style={styles.gridListContainer}>
        <View style={styles.gridListSubContainer}>
          <FlatList
            data={billingItems}
            numColumns={2}
            renderItem={({ item }) => (
              <BillItem bill={item} onPress={onPressItem} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Button title="Create new billing" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColorLight,
    flex: 1,
    width: "100%",
  },
  footer: {
    gap: 4,
    padding: 10,
  },
  gridListContainer: {
    flex: 1,
  },
  gridListSubContainer: {
    flex: 1,
    padding: 10,
  },
  header: {
    alignItems: "center",
    backgroundColor: colors.statusBar,
    height: 120,
  },
});

export default Home;
