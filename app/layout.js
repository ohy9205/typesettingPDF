import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "typesetting pdf",
  description: "pdf웹 조판 연습",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <h1>pdf조판</h1>
        {children}
      </body>
    </html>
  );
}
