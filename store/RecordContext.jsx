import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getValueFromStorage, handleSaveValue } from "../utils/localStorage";

const RecordContext = createContext();

const generateUniqueId = () =>
  Date.now() + Math.random().toString(36).substring(2, 10);

export const RecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const newRecord = (title, amount, mode) => {
    console.log({ title, amount });
    setRecords((it) => [
      ...it,
      {
        id: generateUniqueId(),
        amount: mode === "income" ? amount : `-${amount}`,
        title,
        created: Date.now(),
      },
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

  console.log({ records });

  return (
    <RecordContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ records, newRecord, removeRecord, isSaving }}
    >
      {children}
    </RecordContext.Provider>
  );
};

export default RecordContext;

RecordsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
