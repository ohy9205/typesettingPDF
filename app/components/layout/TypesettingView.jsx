"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { useSelectedExamList } from "../../context/SelectedExamListContext";
import Button from "../Button";
import TypesettingItem from "../TypesettingItem";

const INNER_HEIGHT = 1122;
const MARGIN_HEIGHT = 40;
const META_HEIGHT = 110;
const BUTTON_HEIGHT = 32;

const TypesettingView = () => {
  const { list, removeItem } = useSelectedExamList();
  const [pages, setPages] = useState([]);

  // 리스트 가바뀔때마다 새로 렌더링
  useEffect(() => {
    const newPages = makePages(list);
    setPages(newPages);
  }, [list]);

  return (
    <>
      <Button action={exportPDF}>pdf생성</Button>
      <section className="flex flex-col gap-10">
        {pages.map((page, pageIndex) => (
          <div
            key={pageIndex}
            className="pdfView h-[1122px] flex justify-center items-center bg-slate-200">
            <div>
              <div className={`h-[1100px] flex`}>
                <article className="w-1/2 flex flex-col gap-10">
                  {page.left?.map((item, index) => (
                    <TypesettingItem
                      key={item.examKey}
                      item={item}
                      itemNumber={
                        countItemsBeforeIndex(pages, pageIndex) + index
                      }
                      buttonAction={() => removeItem(item.examKey)}
                    />
                  ))}
                </article>
                <div className="w-[2px] h-full bg-slate-300"></div>
                <article className="w-1/2 flex flex-col gap-10">
                  {page.right?.map((item, index) => (
                    <TypesettingItem
                      key={item.examKey}
                      item={item}
                      itemNumber={
                        countItemsBeforeIndex(pages, pageIndex) +
                        page.left.length +
                        index
                      }
                      buttonAction={() => removeItem(item.examKey)}
                    />
                  ))}
                </article>
              </div>
              <h3 className="text-center">{pageIndex + 1}</h3>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export const exportPDF = async () => {
  const inputElements = document.querySelectorAll(".pdfView"); // PDF로 변환하고자 하는 페이지의 element. 필요에 따라 변경 가능.

  const pdf = new jsPDF({
    orientation: "portrait", // 또는 'landscape'
    unit: "mm",
    format: "a4",
  });

  for (const [index, inputElement] of inputElements.entries()) {
    const canvas = await html2canvas(inputElement, {
      scale: 2, // 화질 향상을 위한 scale 값 조정
    });
    const imgData = canvas.toDataURL("image/png");

    // 이미지를 A4 사이즈에 맞게 조정
    const imgWidth = 210; // A4 너비(mm)
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // 원본 이미지 비율 유지

    // 첫 페이지가 아니라면 새 페이지를 추가합니다.
    if (index > 0) {
      pdf.addPage();
    }

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  }

  pdf.save("download.pdf");
};

const makePages = (list) => {
  const newPages = [];
  let leftTotalHeight = 0;
  let rightTotalHeight = 0;
  let currentPageIndex = 0;

  // 선택한 문제가 변경될때마다 페이지 구성을 새로함
  list.forEach((item) => {
    const itemHeight =
      item.height + META_HEIGHT + BUTTON_HEIGHT + MARGIN_HEIGHT * 2;

    // 페이지 유무 체크
    if (!newPages[currentPageIndex]) {
      newPages[currentPageIndex] = { left: [], right: [] };
    }

    if (
      // 왼쪽 단
      newPages[currentPageIndex].right.length === 0 &&
      leftTotalHeight + itemHeight <= INNER_HEIGHT
    ) {
      newPages[currentPageIndex].left.push(item);
      leftTotalHeight += itemHeight;
    } else if (rightTotalHeight + itemHeight <= INNER_HEIGHT) {
      // 오른쪽 단
      newPages[currentPageIndex].right.push(item);
      rightTotalHeight += itemHeight;
    } else {
      // 다음 페이지 생성
      currentPageIndex++;
      newPages[currentPageIndex] = { left: [item], right: [] };
      leftTotalHeight = itemHeight;
      rightTotalHeight = 0;
    }
  });
  console.log(newPages);
  return newPages;
};

function countItemsBeforeIndex(arr, index) {
  // 합산할 총 항목 수 초기화
  let totalCount = 0;

  // 주어진 인덱스 이전까지 반복하여 각 항목의 left와 right 배열의 길이를 더함
  for (let i = 0; i < index; i++) {
    totalCount += arr[i].left.length + arr[i].right.length;
  }

  // 계산된 총 항목 수 반환
  return totalCount;
}

export default TypesettingView;