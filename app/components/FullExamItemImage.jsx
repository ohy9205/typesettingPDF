import ExamItem from "./ExamItem";

const FullExamItemImage = ({ examKey, category, type }) => {
  return (
    <ExamItem>
      <ExamItem.ExamImage examKey={examKey} type={type} />
      {type === "obj" && <ExamItem.ObjectiveImage examKey={examKey} />}
      {category === "answer" && (
        <ExamItem.AnswerImage
          examKey={examKey}
          type={type}
          width={type === "obj" ? "30" : "100"}
          height={type === "obj" ? "30" : "100"}
        />
      )}
      {category === "explain" && (
        <>
          <ExamItem.AnswerImage
            examKey={examKey}
            type={type}
            width={type === "obj" ? "30" : "100"}
            height={type === "obj" ? "30" : "100"}
          />
          <ExamItem.ExplainImage examKey={examKey} type={type} />
        </>
      )}
    </ExamItem>
  );
};

export default FullExamItemImage;
