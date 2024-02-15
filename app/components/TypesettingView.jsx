"use client";

import { useSelectedExamList } from "../context/SelectedExamListContext";
import FullExamItem from "./FullExamItemImage";
import RemoveButton from "./RemoveButton";

const TypesettingView = () => {
  const { list } = useSelectedExamList();

  return (
    <section>
      <h1>뷰 영역</h1>
      <div className="flex flex-col gap-10">
        {list?.map((it, idx) => {
          return (
            <div key={it.examKey}>
              <h2>문제번호 : {idx + 1}</h2>
              <h3>제목 : {it.examName}</h3>
              <h3>난이도 : {it.examLevel}</h3>
              <h3>문제번호 : {it.examKey}</h3>
              <FullExamItem
                examKey={it.examKey}
                type={it.type}
                category={it.category}
              />
              <RemoveButton examKey={it.examKey} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TypesettingView;
