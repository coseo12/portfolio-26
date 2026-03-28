import type { Metadata } from "next";
import {
  Noto_Serif_KR,
  Playfair_Display,
  JetBrains_Mono,
} from "next/font/google";
import localFont from "next/font/local";
import { cn } from "@/shared/lib/utils";
import { BASE_PATH } from "@/shared/config";
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

const ogImageUrl = `${BASE_PATH}/og-image.png`;

export const metadata: Metadata = {
  title: "서창오 | Frontend & AI Engineer",
  description:
    "개발자 서창오의 포트폴리오. 프론트엔드 전문성에 AI 워크플로우를 결합합니다.",
  keywords: [
    "프론트엔드",
    "개발자",
    "포트폴리오",
    "React",
    "Next.js",
    "TypeScript",
    "AI",
  ],
  authors: [{ name: "서창오" }],
  icons: {
    icon: `${BASE_PATH}/icon.svg`,
  },
  openGraph: {
    title: "서창오 | Frontend & AI Engineer",
    description:
      "프론트엔드 전문성에 AI 워크플로우를 결합하여 제품의 한계를 넓힙니다",
    type: "website",
    url: "https://coseo12.github.io/portfolio-26/",
    images: [
      {
        url: ogImageUrl,
        width: 1280,
        height: 633,
        alt: "서창오 포트폴리오",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "서창오 | Frontend & AI Engineer",
    description:
      "프론트엔드 전문성에 AI 워크플로우를 결합하여 제품의 한계를 넓힙니다",
    images: [ogImageUrl],
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
