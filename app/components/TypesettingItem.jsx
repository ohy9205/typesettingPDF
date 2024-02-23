import { useState } from "react";
import Button from "./Button";
import ExamItem from "./ExamItem";

const TypesettingItem = ({ item, itemNumber, buttonAction }) => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <div onClick={() => setIsVisible((prev) => !prev)} className="relative">
      <ExamItem key={item.examKey}>
        <ExamItem.ItemMeta item={item} itemNumber={itemNumber} />
        <ExamItem.ItemImage
          examKey={item.examKey}
          category={item.category}
          curType={item.curType}
        />
        {isVisible && (
          <div className="absolute bottom-[-32px]">
            <Button action={() => buttonAction()}>삭제하기</Button>
          </div>
        )}
      </ExamItem>
    </div>
  );
};

export default TypesettingItem;
