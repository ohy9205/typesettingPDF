export async function POST(req) {
  console.log("route진입");

  const reqBody = await req.text();
  const examKey = await JSON.parse(reqBody);

  const rs = await fetch(getImageZipUrl(examKey));
  const blob = await rs.blob();

  // 생성된 blob객체를 전달해줌
  return new Response(blob);
}

// pdf용이미지 url 생성함
const getImageZipUrl = (examKey) => {
  const { d6, d4, d2 } = getDData(examKey);
  return `https://www.bj-sup.kr/websvr/contents/common/exam/d6-${d6}/d4-${d4}/d2-${d2}/ek-${examKey}/${examKey}-print.zip`;
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
