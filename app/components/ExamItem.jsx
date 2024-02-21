import FullExamItemImage from "./FullExamItemImage";

const ExamItem = ({ children }) => {
  return <div className="">{children}</div>;
};

const ItemImage = ({ examKey, category, type }) => {
  return (
    <FullExamItemImage examKey={examKey} category={category} type={type} />
  );
};

const ItemMeta = ({ item, itemNumber }) => {
  return (
    <div className="h-[110px]">
      <h2>문제번호 : {itemNumber}</h2>
      <h3>제목 : {item.examName}</h3>
      <h3>난이도 : {item.examLevel}</h3>
      <h3>문제번호 : {item.examKey}</h3>
    </div>
  );
};

export default ExamItem;
ExamItem.ItemImage = ItemImage;
ExamItem.ItemMeta = ItemMeta;
