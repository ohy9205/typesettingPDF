import ExamList from "./components/ExamList";
import { SelectedExamListContextProvider } from "./context/SelectedExamListContext";

export default async function Home() {
  const data = await fetchExamList(); // 배열타입으로 전달받음
  const list = changeDataFormat(data);

  return (
    <main>
      <SelectedExamListContextProvider>
        <ExamList list={list} />
      </SelectedExamListContextProvider>
    </main>
  );
}

// 문제 리스트 가져옴
const fetchExamList = async () => {
  const rs = await fetch("http://localhost:3000/api/examList");
  const { data } = await rs.json();

  return data;
};

const changeDataFormat = (data) => {
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
