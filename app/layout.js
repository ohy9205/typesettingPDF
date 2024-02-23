import { Inter, Nanum_Gothic } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const nanumgothic = Nanum_Gothic({
  style: "normal",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "typesetting pdf",
  description: "pdf웹 조판 연습",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nanumgothic.className}>{children}</body>
    </html>
  );
}
