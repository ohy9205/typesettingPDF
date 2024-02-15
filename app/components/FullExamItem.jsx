import ExamItem from "./ExamItem";

const FullExamItem = ({ examKey, category, type }) => {
  return (
    <ExamItem>
      <ExamItem.ExamImage examKey={examKey} type={type} />
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

export default FullExamItem;
