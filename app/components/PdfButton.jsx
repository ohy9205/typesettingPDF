"use client";

import useMakePdf from "./../hooks/useMakePdf";

const PdfButton = ({ contentsPages }) => {
  const { makePdf, renderItem } = useMakePdf();

  // 이미지 들어가는것까진 확인함
  const onClickHandler = async () => {
    const contentDefinition = {
      content: [
        { text: "헤더영역" },
        {
          columns: [
            await renderItem(contentsPages, "left"),
            await renderItem(contentsPages, "right"),
          ],
        },
      ],
    };
    makePdf(contentDefinition);
  };

  return (
    <div>
      <button onClick={onClickHandler}>pdf생성</button>
    </div>
  );
};

export default PdfButton;
