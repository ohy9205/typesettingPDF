"use client";
"use client";

import { useEffect, useState } from "react";
import { useSelectedExamList } from "../../context/SelectedExamListContext";
import TypesettingItem from "../TypesettingItem";
import PdfButton from "./../PdfButton";

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
    <section className="flex flex-col gap-10">
      <PdfButton contentsPages={pages} />
      {pages.map((page, pageIndex) => (
        <div
          key={pageIndex}
          className="h-[1122px] flex justify-center items-center bg-slate-200">
          <div>
            <div className={`h-[1100px] flex`}>
              <article className="w-1/2 flex flex-col gap-10">
                {page.left?.map((item, index) => (
                  <TypesettingItem
                    key={item.examKey}
                    item={item}
                    itemNumber={item.indexNumber}
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
                    itemNumber={item.indexNumber}
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
  );
};

const makePages = (list) => {
  const newPages = [];
  let leftTotalHeight = 0;
  let rightTotalHeight = 0;
  let currentPageIndex = 0;

  // 선택한 문제가 변경될때마다 페이지 구성을 새로함
  list.forEach((item, index) => {
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
      newPages[currentPageIndex].left.push({ ...item, indexNumber: ++index });
      leftTotalHeight += itemHeight;
    } else if (rightTotalHeight + itemHeight <= INNER_HEIGHT) {
      // 오른쪽 단
      newPages[currentPageIndex].right.push({ ...item, indexNumber: ++index });
      rightTotalHeight += itemHeight;
    } else {
      // 다음 페이지 생성
      currentPageIndex++;
      newPages[currentPageIndex] = {
        left: [{ ...item, indexNumber: ++index }],
        right: [],
      };
      leftTotalHeight = itemHeight;
      rightTotalHeight = 0;
    }
  });
  console.log(newPages);
  return newPages;
};

export default TypesettingView;
