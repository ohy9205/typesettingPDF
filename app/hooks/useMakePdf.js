"use client";

import { BlobReader, BlobWriter, ZipReader } from "@zip.js/zip.js";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

// 폰트 추가
pdfMake.fonts = {
  NanumGothic: {
    normal: "NanumGothic.ttf",
    bold: "NanumGothicBold.ttf",
    italics: "NanumGothicExtraBold.ttf",
    bolditalics: "NanumGothicLight.ttf",
  },
};

const useMakePdf = () => {
  return {
    renderItem,
    makePdf: async (contentDefinition) => {
      const docDefintion = {
        ...contentDefinition,
        footer: function (currentPage, pageCount) {
          return {
            text: currentPage.toString(),
            alignment: "center",
          };
        },
        pageSize: {
          width: 794,
          height: 1100,
        },
        pageMargins: [0, 0, 0, 0],
        defaultStyle: {
          font: "NanumGothic",
          fontSize: 16,
        },
        background: {
          image: await getImageBlob("/images/background.jpg", "GET").then(
            (blob) => converBlobToBase64(blob)
          ),
          absolutePosition: { x: 0, y: 0 },
          alignment: "center",
          opacity: 0.1,
        },
      };

      let win = window.open("", "_blank", "toolbar=0,location=0,menubar=0");
      pdfMake.createPdf(docDefintion).open({}, win);
    },
  };
};

const getImageBlob = async (url, method, item) => {
  const rs = await fetch(url, {
    method: method,
    body: item ? JSON.stringify(item) : undefined,
  });

  return await rs.blob();
};

const renderItem = async (pages, column) => {
  return await Promise.all(
    pages.map(async (page, pageIndex) => {
      // 문제하나
      return Promise.all(
        page[column].map(async (item, itemIndex) => {
          const zipFileBlob = await getImageBlob(
            "http://localhost:3000/api/examImage",
            "POST",
            item.examKey
          );
          const imageBlobList = await createBlobListByUnzipBlob(
            zipFileBlob,
            item.objOption
          );
          return {
            stack: [
              `문제번호 : ${item.indexNumber}`,
              `제목 : ${item.examName}`,
              `난이도 : ${item.examLevel}`,
              `문제번호 : ${item.examKey}`,
              {
                image: await converBlobToBase64(imageBlobList.exam),
                width: 397,
                margin: [0, 16, 0, 16],
              },
              item.curType === "obj"
                ? {
                    image: await converBlobToBase64(imageBlobList.objective),
                    width: 397,
                    margin: [0, 0, 0, 16],
                  }
                : undefined,
              item.category === "answer"
                ? {
                    image: await converBlobToBase64(imageBlobList.answer),
                    width: 397,
                    margin: [0, 0, 0, 16],
                  }
                : undefined,
              item.category === "explain"
                ? ({
                    image: await converBlobToBase64(imageBlobList.answer),
                    width: 397,
                    margin: [0, 0, 0, 16],
                  },
                  {
                    image: await converBlobToBase64(imageBlobList.explain),
                    width: 397,
                    margin: [0, 0, 0, 16],
                  })
                : undefined,
            ],
            pageBreak:
              pageIndex !== pages.length - 1 && // 끝페이지가 아니면서
              itemIndex === page[column].length - 1 && // 문제index가한 단의 마지막 index와 같을때 새 페이지 생성
              "after",
            margin: [0, 0, 0, 64], // 한 문제가 끝날때마다 bottom에 64px마진추가
            lineHeight: 1.3,
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

const createBlobListByUnzipBlob = async (zipBlob, objOption) => {
  // zip파일의 Blob데이터를 읽기 위해 BlobRader 오브젝트 생성
  const zipBlobReader = new BlobReader(zipBlob);

  // zipFileReader를 이용해 zip 컨텐츠를 읽는 객체 생성
  let zipReader = new ZipReader(zipBlobReader);

  try {
    let entries = await zipReader.getEntries();
    const exam = await getImageBlobFromEntry(entries.shift(), "examprint_**77");

    let newImageObject = { exam }; // 문제이미지를 가진 객체 생성

    if (objOption !== "N") {
      // obj N이 아니면 '보기'가 있다는 말임
      newImageObject.objective = await getImageBlobFromEntry(
        entries.shift(),
        "examprint_**77" // 패스워드를 노출시키고 있음. 다른 방법 생각해보자
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

export default useMakePdf;
