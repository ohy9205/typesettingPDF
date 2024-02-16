import Button from "./Button";
import FullExamItem from "./FullExamItemImage";

const TypesettingItem = ({ item, idx }) => {
  return (
    <div className="shadow-lg bg-gray-50 my-5">
      <div className="h-[110px]">
        <h2>문제번호 : {idx + 1}</h2>
        <h3>제목 : {item.examName}</h3>
        <h3>난이도 : {item.examLevel}</h3>
        <h3>문제번호 : {item.examKey}</h3>
      </div>
      <FullExamItem
        examKey={item.examKey}
        type={item.type}
        category={item.category}
      />
      <Button action={() => removeItem(item.examKey)}>삭제하기</Button>
    </div>
  );
};

export default TypesettingItem;
