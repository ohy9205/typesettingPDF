import ExamItem from "./ExamItem";

const FullExamItemImage = ({ examKey, category, type }) => {
  return (
    <ExamItem>
      <ExamItem.ExamImage examKey={examKey} type={type} />
      {type === "obj" && <ExamItem.ObjectiveImage examKey={examKey} />}
      {category === "answer" && (
        <ExamItem.AnswerImage examKey={examKey} type={type} />
      )}
      {category === "explain" && (
        <>
          <ExamItem.AnswerImage examKey={examKey} type={type} />
          <ExamItem.ExplainImage examKey={examKey} type={type} />
        </>
      )}
    </ExamItem>
  );
};

export default FullExamItemImage;
