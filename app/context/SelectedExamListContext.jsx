"use client";

import { createContext, useContext, useState } from "react";

const SelectedExamList = createContext([]);

export const SelectedExamListContextProvider = ({ children }) => {
  const [list, setList] = useState([]);

  return (
    <SelectedExamList.Provider
      value={{
        list,
        addItem: (item) => {
          console.log(item);
          setList((prev) => [...prev, item]);
        },
        removeItem: (examKey) => {
          const newList = list.filter((it) => it.examKey !== examKey);
          setList(newList);
        },
      }}>
      {children}
    </SelectedExamList.Provider>
  );
};

export const useSelectedExamList = () => {
  return useContext(SelectedExamList);
};
