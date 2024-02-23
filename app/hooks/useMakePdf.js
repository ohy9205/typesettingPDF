"use client";
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

const RATE = 5.4285714286;
const PAGE_WIDTH = 794; // width: 1140
const PAGE_HEIGHT = 1122;
// const PAGE_WIDTH = 210 * RATE; // width: 1140
// const PAGE_HEIGHT = 297 * RATE;
const PAGE_HALF_WIDTH = PAGE_WIDTH / 2;
const TOP_BOTTOM_MARGIN = 0;
const LEFT_RIGHT_MARGIN = 0;

const FONT_STYLE = {
  font: "NanumGothic",
  fontSize: 16,
};

// const PAEG_SIZE = "A4";
const PAGE_SIZE = {
  width: 794,
  height: 1122,
};

const useMakePdf = () => {
  // let win = window.open("", "_blank");
  return {
    makePdf: (docDefinition) => {
      pdfMake.createPdf(docDefinition).open();
      // pdfMake
      //   .createPdf({
      //     ...docDefinition,
      //     pageSize: PAGE_SIZE,
      //     defaultStyle: {
      //       ...FONT_STYLE,
      //     },
      //     pageMargins: [0, 0, 0, 0],
      //     stackGap: 40,
      //   })
      //   .open();
    },
  };
};

export default useMakePdf;
