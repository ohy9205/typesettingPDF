"use client";

import { useSelectedExamList } from "../context/SelectedExamListContext";

const AddButton = ({ item, type, category }) => {
  const { addItem } = useSelectedExamList();

  return (
    <button onClick={() => addItem(item, type, category)}>추가하기</button>
  );
};

export default AddButton;
