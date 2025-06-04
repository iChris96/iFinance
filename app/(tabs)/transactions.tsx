import React from "react";
import { Badge } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { FlatList } from "react-native";

const transactions = [
  {
    id: 1,
    title: "Leche",
    amount: 50.0,
    type: "EXPENSE",
    createdAt: "2025-05-30T10:15:00Z",
  },
  {
    id: 2,
    title: "Sueldo",
    amount: 1500.0,
    type: "INCOME",
    createdAt: "2025-05-29T09:00:00Z",
  },
];

const TransactionItem = ({ transaction }: any) => {
  const isExpense = transaction.type === "EXPENSE";
  const amountColor = isExpense ? "text-red-600" : "text-green-600";
  const badgeColor = isExpense ? "error" : "success";

  return (
    <Box className="bg-white p-4 my-2 rounded-lg border border-gray-200 shadow-sm">
      <HStack className="justify-between items-center">
        <VStack space="xs">
          <Text size="md" className="font-bold">
            {transaction.title}
          </Text>
          <Text className="text-xs text-gray-500">
            {new Date(transaction.createdAt).toLocaleDateString()}
          </Text>
        </VStack>
        <VStack className="flex-end">
          <Text className={`text-base font-semibold ${amountColor}`}>
            {isExpense ? "-" : "+"}${transaction.amount.toFixed(2)}
          </Text>
          <Badge
            className={`text-xs px-2 py-1 rounded ${badgeColor}`}
            action={badgeColor}
          >
            <Text className="text-gray-500">{transaction.type}</Text>
          </Badge>
        </VStack>
      </HStack>
    </Box>
  );
};

const TransactionsScreen = () => {
  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <TransactionItem transaction={item} />}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

export default TransactionsScreen;
