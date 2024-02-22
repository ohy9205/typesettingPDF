"use client";

import { useRef, useState } from "react";
import { useSelectedExamList } from "../../context/SelectedExamListContext";
import Button from "../Button";
import ExamItem from "../ExamItem";
/**!SECTION
 * 문제 이름 : EXAM_NAME
 * 난이도 : DIFFICULTY (d1:하/d2:중/d3:상/d4:최상)
 * 시험지 키 : EXAM_KEY
 */

const TYPE_LIST = [
  { name: "객관식", value: "obj" },
  { name: "주관식", value: "sbj" },
  { name: "서술형", value: "des" },
];

const CATEGORY_LIST = [
  { name: "문제만", value: "exam" },
  { name: "정답", value: "answer" },
  { name: "정답+해설", value: "explain" },
];

const ExamList = ({ list }) => {
  const [type, setType] = useState("obj"); // 객/주/서
  const [category, setCategory] = useState("exam"); // 문제/답/해설
  const { list: selectedList, addItem } = useSelectedExamList();
  const itemsRef = useRef(new Array(list.length));

  // '추가하기' 버튼 클릭 액션
  const clickAddButton = (item, type, category, idx) => {
    // 클릭한 문제 이미지 크기를 구함
    let itemHeight = itemsRef.current[idx]?.offsetHeight || 0;
    // 선택한 문제 리스트에 문제 정보와 높이값 추가
    addItem({ ...item, height: itemHeight }, type, category);
  };

  // 타입별로 문제 리스트 받아옴
  const filteredList = (type) => {
    let newList = list.filter(
      (listItem) =>
        !selectedList.some(
          (seletecItem) => seletecItem.examKey === listItem.examKey
        )
    );

    if (type === "sbj") {
      newList = newList.filter((it) => it.sbjOption !== "N");
    } else if (type === "des") {
      newList = newList.filter((it) => it.desOption !== "N");
    } else {
      newList = newList.filter((it) => it.objOption !== "N");
    }
    return newList;
  };

  return (
    <section className="p-5 flex flex-col gap-5">
      <div>
        {TYPE_LIST.map(({ name, value }) => (
          <label key={name}>
            <input
              type="radio"
              name="type"
              value={value}
              onChange={() => setType(value)}
              defaultChecked={value === "obj"}
            />
            {name}
          </label>
        ))}
      </div>
      <div>
        {CATEGORY_LIST.map(({ name, value }) => (
          <label key={name}>
            <input
              type="radio"
              name="category"
              value={value}
              onChange={() => setCategory(value)}
              defaultChecked={value === "exam"}
            />
            {name}
          </label>
        ))}
      </div>
      <ul className="flex flex-col gap-10">
        {filteredList(type)?.map((it, idx) => (
          <li key={it.examKey} ref={(el) => (itemsRef.current[idx] = el)}>
            <ExamItem>
              <ExamItem.ItemImage
                examKey={it.examKey}
                category={category}
                curType={type}
              />
              <Button action={() => clickAddButton(it, type, category, idx)}>
                추가하기
              </Button>
            </ExamItem>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ExamList;
