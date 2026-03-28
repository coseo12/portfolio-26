import type { Metadata } from "next";
import {
  Noto_Serif_KR,
  Playfair_Display,
  JetBrains_Mono,
} from "next/font/google";
import localFont from "next/font/local";
import { cn } from "@/shared/lib/utils";
import "./globals.css";

const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-noto-serif-kr",
  display: "swap",
  preload: true,
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});

export const metadata: Metadata = {
  title: "서창오 | AI-Augmented Developer",
  description:
    "11년차 개발자 서창오의 포트폴리오. AI 에이전트와 프론트엔드 전문성을 결합합니다.",
  keywords: [
    "프론트엔드",
    "개발자",
    "포트폴리오",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "서창오" }],
  openGraph: {
    title: "서창오 | AI-Augmented Developer",
    description: "11년차 개발자 서창오의 포트폴리오",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={cn(
        notoSerifKr.variable,
        playfairDisplay.variable,
        jetbrainsMono.variable,
        pretendard.variable
      )}
    >
      <body>{children}</body>
    </html>
  );
}
