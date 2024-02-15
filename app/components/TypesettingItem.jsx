import FullExamItem from "./FullExamItemImage";

const TypesettingItem = ({ item, idx }) => {
  return (
    <div>
      <h2>문제번호 : {idx + 1}</h2>
      <h3>제목 : {item.examName}</h3>
      <h3>난이도 : {item.examLevel}</h3>
      <h3>문제번호 : {item.examKey}</h3>
      <FullExamItem
        examKey={item.examKey}
        type={item.type}
        category={item.category}
      />
    </div>
  );
};

export default TypesettingItem;
