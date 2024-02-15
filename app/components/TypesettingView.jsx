"use client";

import { useSelectedExamList } from "../context/SelectedExamListContext";
import RemoveButton from "./RemoveButton";
import TypesettingItem from "./TypesettingItem";

const TypesettingView = () => {
  const { list } = useSelectedExamList();

  return (
    <section
      className="flex flex-grow p-4"
      style={{ width: "calc(100vh * 0.707)", height: "calc(100vh - 1rem)" }}>
      <div className="w-1/2 flex flex-col gap-10">
        왼쪽단
        {list?.map((it, idx) => {
          return (
            <div
              key={it.examKey}
              className="flex flex-col gap-4 shadow-lg bg-gray-50">
              <TypesettingItem item={it} idx={idx} />
              <RemoveButton examKey={it.examKey} />
            </div>
          );
        })}
      </div>
      <div className="border mx-2"></div>
      <div className="w-1/2">오른쪽단</div>
    </section>
  );
};

export default TypesettingView;
