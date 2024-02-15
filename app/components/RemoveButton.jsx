"use client";

import { useSelectedExamList } from "../context/SelectedExamListContext";

const RemoveButton = ({ examKey }) => {
  const { removeItem } = useSelectedExamList();
  return <button onClick={() => removeItem(examKey)}>제거하기</button>;
};

export default RemoveButton;
