"use client";

import { ChevronDown } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { useCrossfadeScroll, getSectionScrollTarget } from "@/shared/lib/hooks/useCrossfadeScroll";
import { cn } from "@/shared/lib/utils";

/** #projects 섹션으로 부드럽게 스크롤 */
function scrollToProjects() {
  window.scrollTo({ top: getSectionScrollTarget(2), behavior: "smooth" });
}

/** #contact 섹션으로 부드럽게 스크롤 */
function scrollToContact() {
  window.scrollTo({ top: getSectionScrollTarget(3), behavior: "smooth" });
}

export function HeroSection() {
  const { style, scrollY } = useCrossfadeScroll(0, 4);

  // 스크롤 인디케이터: 스크롤이 거의 없을 때만 표시
  const showIndicator = scrollY < 50;

  return (
    <div
      id="hero"
      className="fixed inset-0 z-[11] flex items-center"
      style={style}
    >
      <div className="w-full will-change-[transform,opacity]">
        <div className="relative z-10 flex max-w-2xl flex-col items-start gap-4 px-6 pt-16 md:px-12 lg:px-24">
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
            웹 프론트엔드부터 AI Agent 설계까지, 사용자 중심의
            제품을 만드는 소프트웨어 엔지니어입니다.
          </p>
          <div className="flex gap-3">
            <Button onClick={scrollToProjects}>프로젝트 보기</Button>
            <Button variant="outline" onClick={scrollToContact}>연락하기</Button>
          </div>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <div
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500",
          showIndicator ? "opacity-50" : "opacity-0 pointer-events-none",
        )}
      >
        <ChevronDown className="size-6 animate-bounce text-muted-foreground" />
      </div>
    </div>
  );
}
