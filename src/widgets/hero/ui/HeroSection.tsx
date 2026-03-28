"use client";

import { useRef, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { SITE_CONFIG, BASE_PATH } from "@/shared/config";
import { GoldParticles } from "@/shared/ui/gold-particles";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);

  const handleCtaClick = () => {
    const target = document.getElementById("projects");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  const updateVideoTime = useCallback(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || !video.duration) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = rect.height;
    // 스크롤 진행률: 0(맨 위) → 1(Hero 벗어남)
    const progress = Math.min(
      Math.max(-rect.top / sectionHeight, 0),
      1
    );
    video.currentTime = progress * video.duration;
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 비디오 메타데이터 로드 후 첫 프레임 표시
    const handleLoaded = () => {
      video.currentTime = 0;
    };
    video.addEventListener("loadedmetadata", handleLoaded);

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateVideoTime);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateVideoTime]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* L1: 스크롤 연동 배경 비디오 */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
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

      {/* 중앙 텍스트 — 반투명 백드롭으로 가독성 확보 */}
      <div
        className="relative z-30 flex flex-col items-center gap-4 rounded-3xl px-10 py-8 text-center md:px-16 md:py-10"
        style={{
          background: "radial-gradient(ellipse at center, rgba(10,14,23,0.6) 0%, rgba(10,14,23,0.3) 60%, transparent 100%)",
        }}
      >
        <h1 className="font-heading text-gold-gradient text-5xl font-bold leading-tight pb-1 md:text-7xl">
          {SITE_CONFIG.name}
        </h1>
        <p className="font-serif text-xl tracking-wide text-moon md:text-2xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          {SITE_CONFIG.title}
        </p>
        <p className="max-w-md text-base text-moon/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          {SITE_CONFIG.description}
        </p>
        <button
          onClick={handleCtaClick}
          className="mt-4 cursor-pointer rounded-lg border border-gold-500 bg-ink-900/60 px-8 py-3 text-sm font-medium text-gold-400 transition-all duration-300 hover:glow-gold hover:bg-gold-500/10"
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
