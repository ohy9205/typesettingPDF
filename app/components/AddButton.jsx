"use client";

import { useSelectedExamList } from "../context/SelectedExamListContext";

const AddButton = ({ item }) => {
  const { addItem } = useSelectedExamList();

  const onClickHandler = (item) => {
    addItem(item);
  };

  return <button onClick={() => onClickHandler(item)}>추가하기</button>;
};

export default AddButton;
