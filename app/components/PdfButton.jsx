"use client";

import { BlobReader, BlobWriter, ZipReader } from "@zip.js/zip.js";
import useMakePdf from "./../hooks/useMakePdf";

const PdfButton = ({ contentsPages }) => {
  const { makePdf } = useMakePdf();

  // 이미지 들어가는것까진 확인함
  const onClickHandler = async () => {
    const pdfContents = {
      content: [
        {
          columns: [
            [await renderItem(contentsPages, "left")],
            [await renderItem(contentsPages, "right")],
          ],
        },
      ],
    };

    makePdf(pdfContents);
  };

  return (
    <div>
      <button onClick={onClickHandler}>pdf생성</button>
    </div>
  );
};

const renderItem = async (pages, columns) => {
  return await Promise.all(
    pages.map(async (page, pageIndex) => {
      // 문제하나
      return Promise.all(
        page[columns].map(async (item, itemIndex) => {
          const zipFileBlob = await getImageBlob(
            "http://localhost:3000/api/examImage",
            item.examKey
          );
          const imageBlobList = await unzipBlob(zipFileBlob, item.objOption);
          return {
            stack: [
              `문제번호 : ${item.indexNumber}`,
              `제목 : ${item.examName}`,
              `난이도 : ${item.examLevel}`,
              `문제번호 : ${item.examKey}`,
              {
                image: await converBlobToBase64(imageBlobList.exam),
                width: 200,
              },
              item.curType === "obj"
                ? {
                    image: await converBlobToBase64(imageBlobList.objective),
                    width: 200,
                  }
                : undefined,
              item.category === "answer"
                ? {
                    image: await converBlobToBase64(imageBlobList.answer),
                    width: 200,
                  }
                : undefined,
              item.category === "explain"
                ? ({
                    image: await converBlobToBase64(imageBlobList.answer),
                    width: 200,
                  },
                  {
                    image: await converBlobToBase64(imageBlobList.explain),
                    width: 200,
                  })
                : undefined,
            ],
            pageBreak:
              pageIndex !== pages.length - 1 &&
              itemIndex === page[columns].length - 1 &&
              "after",
          };
        })
      );
    })
  );
};

const converBlobToBase64 = async (blob) => {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onloadend = () => {
      console.log("변환완료!");
      resolve(reader.result);
    };
    reader.onerror = () => {
      console.log("에러발생!");
    };
    reader.readAsDataURL(blob);
  });
};

const getImageBlob = async (url, item) => {
  const rs = await fetch(url, {
    method: "POST",
    body: JSON.stringify(item),
  });

  return await rs.blob();
};

const unzipBlob = async (zipBlob, objOption) => {
  // zip파일의 Blob데이터를 읽기 위해 BlobRader 오브젝트 생성
  const zipBlobReader = new BlobReader(zipBlob);

  // zipFileReader를 이용해 zip 컨텐츠를 읽는 객체 생성
  let zipReader = new ZipReader(zipBlobReader);

  try {
    let entries = await zipReader.getEntries();
    const exam = await getImageBlobFromEntry(entries.shift(), "examprint_**77");

    let newImageObject = { exam };

    if (objOption !== "N") {
      // obj N이 아니면 '보기'가 있다는 말임
      newImageObject.objective = await getImageBlobFromEntry(
        entries.shift(),
        "examprint_**77"
      );

      newImageObject.answer = await getImageBlobFromEntry(
        entries.shift(),
        "examprint_**77"
      );
      newImageObject.explain = await getImageBlobFromEntry(
        entries.shift(),
        "examprint_**77"
      );
    } else {
      // obj N이면 '보기'가 없다는 말임
      newImageObject.answer = await getImageBlobFromEntry(
        entries.shift(),
        "examprint_**77"
      );
      newImageObject.explain = await getImageBlobFromEntry(
        entries.shift(),
        "examprint_**77"
      );
    }

    return newImageObject;
  } catch (e) {
    console.log(e);
  } finally {
    // zipReader를 닫음
    await zipReader.close();
  }
};

// 이미지 압축풀고 가져오기
const getImageBlobFromEntry = async (entry, password) => {
  // 해제된 zip파일 '첫번째' 데이터가 기록을 위해 BlobWriter 객체 생성
  const zipBlobWriter = new BlobWriter("image/png"); // type을 "image/png"로 지정
  return await entry.getData(zipBlobWriter, {
    password,
  });
};

export default PdfButton;
