import Image from "next/image";

const ExamItem = ({ children }) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};

const ExamImage = ({ examKey, type }) => {
  return (
    <Image
      src={getImageUrl(examKey, "exam", type)}
      alt="문제"
      width={"1500"}
      height={"1000"}
    />
  );
};

const ObjectiveImage = ({ examKey }) => {
  return (
    <Image
      src={getImageUrl(examKey, "objective", "obj")}
      alt="보기"
      width={"1500"}
      height={"1200"}
    />
  );
};

const AnswerImage = ({ examKey, type }) => {
  return (
    <Image
      src={getImageUrl(examKey, "answer", type)}
      alt="정답"
      width={"100"}
      height={"100"}
    />
  );
};

const ExplainImage = ({ examKey, type }) => {
  return (
    <Image
      src={getImageUrl(examKey, "explain", type)}
      alt="해설"
      width={"1500"}
      height={"1500"}
    />
  );
};

// 이미지 url 생성함
const getImageUrl = (examKey, category, type) => {
  const { d6, d4, d2 } = getDData(examKey);
  return `https://www.bj-sup.kr/websvr/contents/common/exam/d6-${d6}/d4-${d4}/d2-${d2}/ek-${examKey}/${examKey}-web-${type}-${category}.png`;
};

// 이미지 url 가져올때 필요한 데이터 계산
const getDData = (examKey) => {
  const d6 = String(Math.floor(examKey / 1000000)).padStart(3, "0");
  const d4 = String(Math.floor((examKey % 1000000) / 10000)).padStart(2, "0");
  const d2 = String(Math.floor(((examKey % 1000000) % 10000) / 100)).padStart(
    2,
    "0"
  );

  return { d6, d4, d2 };
};

export default ExamItem;
ExamItem.ExamImage = ExamImage;
ExamItem.AnswerImage = AnswerImage;
ExamItem.ExplainImage = ExplainImage;
ExamItem.ObjectiveImage = ObjectiveImage;
