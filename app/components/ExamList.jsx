"use client";

import { useState } from "react";
import { useSelectedExamList } from "../context/SelectedExamListContext";
import AddButton from "./AddButton";
import FullExamItemImage from "./FullExamItemImage";
/**!SECTION
 * 문제 이름 : EXAM_NAME
 * 난이도 : DIFFICULTY (d1:하/d2:중/d3:상/d4:최상)
 * 시험지 키 : EXAM_KEY
 */

const ExamList = ({ list }) => {
  const [type, setType] = useState("obj"); // 객/주/서
  const [category, setCategory] = useState("exam"); // 문제/답/해설

  const { list: selectedList } = useSelectedExamList();

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
    <section>
      <div>
        <div>
          <label>
            <input
              type="radio"
              name="type"
              value="obj"
              onChange={() => setType("obj")}
              defaultChecked
            />
            객관식
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="sbj"
              onChange={() => setType("sbj")}
            />
            주관식
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="des"
              onChange={() => setType("des")}
            />
            서술형
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="category"
              value="exam"
              onChange={() => setCategory("exam")}
              defaultChecked
            />
            문제
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="answer"
              onChange={() => setCategory("answer")}
            />
            정답
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="explain"
              onChange={() => setCategory("explain")}
            />
            정답+해설
          </label>
        </div>
      </div>
      <ul className="flex flex-col gap-10">
        {filteredList(type)?.map((it) => (
          <li key={it.examKey}>
            <FullExamItemImage
              examKey={it.examKey}
              type={type}
              category={category}
            />
            <AddButton item={it} type={type} category={category} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ExamList;
