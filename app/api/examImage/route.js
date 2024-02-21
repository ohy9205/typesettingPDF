import { BlobReader, BlobWriter, ZipReader } from "@zip.js/zip.js";

export async function POST(req) {
  console.log("route진입");

  const reqBody = await req.text();
  const reqExamKey = await JSON.parse(reqBody);

  const rs = await fetch(getImageZipUrl(reqExamKey.examKey));
  // 이미지 url
  const blob = await rs.blob();

  // zip파일의 Blob데이터를 읽기 위해 BlobRader 오브젝트 생성
  const zipBlobReader = new BlobReader(blob);

  // 해제된 zip파일 '첫번째' 데이터가 기록을 위해 BlobWriter 객체 생성
  const zipBlobWriter = new BlobWriter("image/png"); // type을 "image/png"로 지정

  // zipFileReader를 이용해 zip 컨텐츠를 읽는 객체 생성
  const zipReader = new ZipReader(zipBlobReader);

  // 첫 항목의 메타데이터를 검색하고
  const firstEntry = (await zipReader.getEntries()).shift();
  // 메타데이터를 이용해서 해당 항목 가져옴
  const zipBlob = await firstEntry.getData(zipBlobWriter, {
    password: "examprint_**77",
  });

  // zipReader를 닫음
  await zipReader.close();

  // 생성된 blob객체를 전달해줌
  return new Response(zipBlob);
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
