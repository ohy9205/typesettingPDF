import puppeteer from "puppeteer";

export async function POST(req, res) {
  const { content } = await req.json();
  console.log(content);

  // Puppeteer 인스턴스 생성
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 생성할 PDF의 내용이 담긴 페이지로 이동
  // 예: HTML 문자열을 직접 로드하거나, 실제 웹페이지 URL을 사용할 수 있습니다.
  await page.setContent(content);

  // PDF 생성
  const pdf = await page.pdf({
    format: "A4",
    printBackground: true, // 배경 색상과 이미지도 포함
  });

  // 브라우저 종료
  await browser.close();

  // PDF 파일 클라이언트에 전송
  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="example.pdf"',
    },
  });
}
