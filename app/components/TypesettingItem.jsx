"use client";

import { useState } from "react";
import Button from "./Button";
import ExamItem from "./ExamItem";

const TypesettingItem = ({ item, itemNumber, buttonAction }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      <ExamItem key={item.examKey}>
        <ExamItem.ItemMeta item={item} itemNumber={itemNumber} />
        <ExamItem.ItemImage
          examKey={item.examKey}
          category={item.category}
          type={item.type}
        />
        {isHover && <Button action={() => buttonAction()}>삭제하기</Button>}
      </ExamItem>
    </div>
  );
};

export default TypesettingItem;
