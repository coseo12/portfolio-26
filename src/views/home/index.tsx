"use client";

import { Header } from "@/widgets/header";
import { HeroSection } from "@/widgets/hero";
import { AboutSection } from "@/widgets/about";
import { ProjectsSection } from "@/widgets/projects";
import { ContactSection } from "@/widgets/contact";
import { ParticleNetwork } from "@/shared/ui/particle-network";
import { getSpacerHeightVh } from "@/shared/lib/hooks/useCrossfadeScroll";

const TOTAL_SECTIONS = 4;

export function HomePage() {
  const spacerHeight = getSpacerHeightVh(TOTAL_SECTIONS);

  return (
    <>
      {/* 3D 파티클 네트워크 배경 — 전체 화면 고정 */}
      <div className="fixed inset-0 z-0">
        <ParticleNetwork />
      </div>

      <Header />

      {/* 모든 섹션 — fixed로 뷰포트에 쌓임 */}
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />

      {/* 스크롤 스페이서 — 전체 스크롤 영역 확보 */}
      <div style={{ height: `${spacerHeight}vh` }} />
    </>
  );
}
