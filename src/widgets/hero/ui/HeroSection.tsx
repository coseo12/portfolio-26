"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ChevronDown } from "lucide-react";

import { FloatingLines } from "@/shared/ui/floating-lines";
import { Button } from "@/shared/ui/button";

/** 다크모드에 따라 다른 라인 그라데이션 색상 사용 */
const LIGHT_GRADIENT = ["#3D6FC2", "#3490C5", "#5B8ED9"];
const DARK_GRADIENT = ["#6B9AE8", "#5BA8E0", "#8BB8F0"];

/** #projects 섹션으로 부드럽게 스크롤 */
function scrollToProjects() {
  const el = document.getElementById("projects");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  // SSR에서는 라이트 기본값 사용, 클라이언트 마운트 후 테마 반영
  const gradient =
    mounted && resolvedTheme === "dark" ? DARK_GRADIENT : LIGHT_GRADIENT;

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center pt-16"
    >
      {/* 배경: Floating Lines */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <FloatingLines
          linesGradient={gradient}
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={[4, 6, 4]}
          lineDistance={[6, 4, 6]}
          animationSpeed={0.8}
          interactive={true}
          parallax={true}
          parallaxStrength={0.15}
          mixBlendMode="normal"
        />
      </div>

      {/* 오버레이 콘텐츠 */}
      <div className="relative z-10 flex max-w-2xl flex-col items-start gap-4 px-6 md:px-12 lg:px-24">
        <p className="text-sm uppercase tracking-wide text-muted-foreground">
          안녕하세요, 저는
        </p>
        <h1 className="text-4xl font-medium text-foreground md:text-5xl">
          서창오
        </h1>
        <p className="text-2xl font-medium text-primary md:text-3xl">
          Software Engineer
        </p>
        <p className="max-w-md text-[15px] text-muted-foreground">
          7년차 소프트웨어 엔지니어로, React·Next.js·Vue.js 생태계에서 사용자
          중심의 웹 애플리케이션을 만들고 있습니다.
        </p>
        <div className="flex gap-3">
          <Button onClick={scrollToProjects}>프로젝트 보기</Button>
          <Button variant="outline">연락하기</Button>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown className="size-6 animate-bounce text-muted-foreground" />
      </div>
    </section>
  );
}
