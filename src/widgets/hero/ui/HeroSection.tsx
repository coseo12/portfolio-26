"use client";

import { ChevronDown } from "lucide-react";
import { SITE_CONFIG, BASE_PATH } from "@/shared/config";
import { GoldParticles } from "@/shared/ui/gold-particles";

export function HeroSection() {
  const handleCtaClick = () => {
    const target = document.getElementById("projects");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative flex h-screen items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* L1: 배경 비디오 */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={`${BASE_PATH}/hero-bg.webp`}
          className="h-full w-full object-cover xl:blur-[1px] 2xl:blur-[2px]"
          aria-hidden="true"
        >
          <source src={`${BASE_PATH}/hero.mp4`} type="video/mp4" />
        </video>
        {/* 오버레이: 중앙 반투명 + 가장자리 비네팅 */}
        <div className="absolute inset-0 bg-ink-900/40" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(10,14,23,0.5) 70%, rgba(10,14,23,0.85) 100%)",
          }}
        />
      </div>

      {/* L2: 금빛 파티클 */}
      <GoldParticles />

      {/* 중앙 텍스트 */}
      <div className="relative z-30 flex flex-col items-center gap-4 px-4 text-center">
        <h1 className="font-heading text-gold-gradient text-5xl font-bold leading-tight pb-1 md:text-7xl">
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
