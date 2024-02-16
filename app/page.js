import ExamList from "./components/layout/ExamList";
import TypesettingView from "./components/layout/TypesettingView";
import { SelectedExamListContextProvider } from "./context/SelectedExamListContext";

export default async function Home() {
  // 문제 리스트 가져옴
  const data = await fetchExamList();
  // 리스트 데이터 포맷 변경
  const list = changeDataFormat(data);

  return (
    <main>
      <div className="flex gap-10">
        <SelectedExamListContextProvider>
          <div className="w-[450px] h-screen overflow-scroll">
            <ExamList list={list} />
          </div>
          <div className="w-[794px] h-screen overflow-scroll">
            <TypesettingView />
          </div>
        </SelectedExamListContextProvider>
      </div>
    </main>
  );
}

const fetchExamList = async () => {
  const rs = await fetch("http://localhost:3000/api/examList");
  const { data } = await rs.json();

  return data;
};

const changeDataFormat = (data) => {
  if (!data) {
    return [];
  }

  return data.map(
    ({
      DIFFICULTY,
      EXAM_KEY,
      EXAM_NAME,
      OBJ_OPTION,
      SBJ_OPTION,
      DES_OPTION,
    }) => {
      let level;
      if (DIFFICULTY === "d1") {
        level = "하";
      } else if (DIFFICULTY === "d2") {
        level = "중";
      } else if (DIFFICULTY === "d3") {
        level = "상";
      } else if (DIFFICULTY === "d4") {
        level = "최상";
      }

      return {
        examName: EXAM_NAME,
        examKey: EXAM_KEY,
        examLevel: level,
        objOption: OBJ_OPTION,
        sbjOption: SBJ_OPTION,
        desOption: DES_OPTION,
      };
    }
  );
};
