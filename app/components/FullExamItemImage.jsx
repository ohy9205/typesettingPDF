import Image from "next/image";

const FullExamItemImage = ({ examKey, category, curType }) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Image
          src={getImageUrl(examKey, "exam", curType)}
          alt="문제"
          width={"1000"}
          height={"600"}
        />
      </div>

      {curType === "obj" && (
        <div>
          <Image
            src={getImageUrl(examKey, "objective", "obj")}
            alt="보기"
            width={"1000"}
            height={"700"}
          />
        </div>
      )}
      {category === "answer" && (
        <div>
          <Image
            src={getImageUrl(examKey, "answer", curType)}
            alt="정답"
            width={60}
            height={60}
            // width={curType === "obj" ? "30" : "80"}
            // height={curType === "obj" ? "30" : "80"}
            className="w-auto h-4 object-contain"
          />
        </div>
      )}
      {category === "explain" && (
        <div>
          <Image
            src={getImageUrl(examKey, "answer", curType)}
            alt="정답"
            width={80}
            height={80}
            // width={curType === "obj" ? "30" : "80"}
            // height={curType === "obj" ? "30" : "80"}
            className="w-auto h-4 object-contain"
          />
          <Image
            src={getImageUrl(examKey, "explain", curType)}
            alt="해설"
            width={"1500"}
            height={"1500"}
          />
        </div>
      )}
    </div>
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

export default FullExamItemImage;
