import React, { createContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { getValueFromStorage, handleSaveValue } from "../utils/localStorage";

const RecordContext = createContext();

const generateUniqueId = () => {
  return Date.now() + Math.random().toString(36).substring(2, 10);
};

export const RecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const newRecord = (title, amount) => {
    console.log({ title, amount });
    setRecords((it) => [
      ...it,
      { id: generateUniqueId(), amount, title, created: Date.now() },
    ]);
  };

  const removeRecord = ({ id }) => {
    console.log("Removing: ", id);
    const updatedRecords = records.filter((record) => record.id !== id);
    setRecords(updatedRecords);
  };

  useEffect(() => {
    console.log({ records });
    if (!records.length) return;

    setIsSaving(true);
    const saveRecords = async () => {
      await handleSaveValue(records);
      setIsSaving(false);
    };

    saveRecords();
  }, [records]);

  useEffect(() => {
    const loadRecords = async () => {
      const storedRecords = await getValueFromStorage();
      console.log({ storedRecords });
      if (storedRecords) {
        setRecords(storedRecords);
      }
    };

    loadRecords();
  }, []);

  return (
    <RecordContext.Provider
      value={{ records, newRecord, removeRecord, isSaving }}
    >
      {children}
    </RecordContext.Provider>
  );
};

export default RecordContext;

const styles = StyleSheet.create({});
