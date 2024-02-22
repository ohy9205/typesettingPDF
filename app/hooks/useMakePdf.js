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
const PAGE_WIDTH = 210 * RATE; // width: 1140
const PAGE_HEIGHT = 297 * RATE;
// const TOP_BOTTOM_MARGIN = 110;
// const LEFT_RIGHT_MARGIN = 0;

const FONT_STYLE = {
  font: "NanumGothic",
  fontSize: 12,
};

const PAEG_SIZE = "A4";

const useMakePdf = () => {
  return {
    makePdf: (docDefinition) => {
      pdfMake
        .createPdf({
          ...docDefinition,
          pages: 3,
          pageSize: PAEG_SIZE,
          defaultStyle: {
            ...FONT_STYLE,
          },
        })
        .open();
    },
  };
};

export default useMakePdf;
