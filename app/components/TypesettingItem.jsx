import Button from "./Button";
import ExamItem from "./ExamItem";

const TypesettingItem = ({ item, itemNumber, buttonAction }) => {
  return (
    <ExamItem key={item.examKey}>
      <ExamItem.ItemMeta item={item} itemNumber={itemNumber} />
      <ExamItem.ItemImage
        examKey={item.examKey}
        category={item.category}
        type={item.type}
      />
      <Button action={() => buttonAction()}>삭제하기</Button>
    </ExamItem>
  );
};

export default TypesettingItem;
