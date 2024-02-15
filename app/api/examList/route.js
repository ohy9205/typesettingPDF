const url = `https://www.bj-sup.kr/application/hoffconts_member/contents_manage/exam_manage/exam_manage/getExamList.json?pClKey=${process.env.API_pCIKey}`;

export async function GET() {
  const res = await fetch(url);
  const data = await res.json();

  return Response.json({ data: data.value });
}
