"use client";

import { ChevronDown } from "lucide-react";
import { SITE_CONFIG } from "@/shared/config";
import { GoldParticles } from "@/shared/ui/gold-particles";
import { useScrollPosition } from "@/shared/lib/hooks/useScrollPosition";

export function HeroSection() {
  const scrollY = useScrollPosition();

  const handleCtaClick = () => {
    const target = document.getElementById("projects");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative flex h-screen items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* L1: 배경 이미지 (패럴랙스) */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <img
          src="/hero-bg.webp"
          alt=""
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
        {/* 배경 위 어두운 오버레이 — 텍스트 가독성 확보 */}
        <div className="absolute inset-0 bg-ink-900/60" />
      </div>

      {/* L2: 보름달 */}
      <div
        className="absolute z-10 h-[120px] w-[120px] rounded-full md:h-[180px] md:w-[180px]"
        style={{
          top: "15%",
          left: "55%",
          transform: `translateY(${scrollY * 0.15}px)`,
          background:
            "radial-gradient(circle, rgba(245,240,224,0.95) 0%, rgba(245,240,224,0.6) 40%, rgba(245,240,224,0) 70%)",
          boxShadow:
            "0 0 80px rgba(245,240,224,0.3), 0 0 160px rgba(245,240,224,0.15), 0 0 240px rgba(245,240,224,0.05)",
        }}
        aria-hidden="true"
      />

      {/* L3: 금빛 파티클 */}
      <GoldParticles />

      {/* 중앙 텍스트 */}
      <div className="relative z-30 flex flex-col items-center gap-4 px-4 text-center">
        <h1 className="font-heading text-gold-gradient text-5xl font-bold md:text-7xl">
          {SITE_CONFIG.name}
        </h1>
        <p className="font-serif text-xl tracking-wide text-moon md:text-2xl">
          {SITE_CONFIG.title}
        </p>
        <p className="max-w-md text-base text-moon/80">
          {SITE_CONFIG.description}
        </p>
        <button
          onClick={handleCtaClick}
          className="mt-4 cursor-pointer rounded-lg border border-gold-500 px-8 py-3 text-sm font-medium text-gold-400 transition-all duration-300 hover:glow-gold hover:bg-gold-500/10"
        >
          프로젝트 보기
        </button>
      </div>

      {/* 스크롤 힌트 */}
      <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2">
        <ChevronDown
          className="h-8 w-8 animate-bounce text-moon/60"
          aria-hidden="true"
        />
      </div>

      {/* 하단 그라디언트 — 다음 섹션과 자연스럽게 연결 */}
      <div className="ink-fade-bottom absolute bottom-0 left-0 z-20 h-32 w-full" />
    </section>
  );
}
