import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import colors from "../../consts/colors";
import { textStyles } from "../../consts/text";
import BillingController from "../../controller/billingController";
import Button from "../button";
import BillItem from "./billItem";

const Home = () => {
  const [controller] = useState(new BillingController());
  const [billingItems, setBillingItems] = useState([]);
  const router = useRouter();

  const onPressItem = (bill) => {
    router.push({ pathname: `/billings/${bill.id}` });
  };

  useEffect(() => {
    setBillingItems(controller.getAllItems());
  }, [controller]);

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
      <Link href="/billings/bacon">View user</Link>
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
