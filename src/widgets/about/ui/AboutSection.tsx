"use client";

import { useTheme } from "next-themes";

import { ProfileCard } from "./ProfileCard";
import { SkillGrid } from "./SkillGrid";
import { TimelineCard } from "./TimelineCard";

/** 경력 데이터 */
const EXPERIENCE_ITEMS = [
  {
    title: "Frontend Developer",
    organization: "ABC 테크",
    period: "2022.03 – 현재",
    description: "React, TypeScript 기반 어드민 대시보드 개발",
  },
  {
    title: "Web Publisher",
    organization: "XYZ 에이전시",
    period: "2020.06 – 2022.02",
    description: "반응형 웹사이트 퍼블리싱 및 유지보수",
  },
];

/** 교육 데이터 */
const EDUCATION_ITEMS = [
  {
    title: "컴퓨터공학 학사",
    organization: "OO대학교",
    period: "2016 – 2020",
  },
  {
    title: "정보처리기사",
    organization: "한국산업인력공단",
    period: "2020",
  },
];

export function AboutSection() {
  const { resolvedTheme } = useTheme();

  // Hero 배경이 검정 계열이므로 그라디언트 시작색을 테마에 맞춤
  const gradientFrom =
    resolvedTheme === "dark" ? "from-[hsl(222,25%,8%)]" : "from-black";

  return (
    <section id="about" className="relative min-h-screen bg-background pt-16">
      {/* 상단 그라디언트 페이드 — Hero에서 About으로 자연스럽게 전환 */}
      <div
        className={`pointer-events-none absolute left-0 right-0 top-0 z-10 h-32 bg-gradient-to-b ${gradientFrom} to-transparent`}
        aria-hidden="true"
      />

      {/* 콘텐츠 */}
      <div className="relative z-20 mx-auto max-w-5xl px-6 py-16 md:px-12 lg:px-24">
        {/* 섹션 헤더 */}
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          ABOUT ME
        </p>
        <h2 className="mt-2 text-3xl font-medium text-foreground">
          저를 소개합니다
        </h2>

        {/* 프로필 + 소개 (2컬럼) */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          <ProfileCard />
          <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              3년차 프론트엔드 개발자로, React와 TypeScript 생태계에서 사용자
              중심의 웹 애플리케이션을 만들고 있습니다.
            </p>
            <p>
              복잡한 비즈니스 요구사항을 직관적인 인터페이스로 풀어내는 것을
              좋아하며, 컴포넌트 설계와 상태 관리 패턴에 깊은 관심을 가지고
              있습니다.
            </p>
            <p>
              최근에는 Next.js App Router와 서버 컴포넌트를 활용한 풀스택 개발
              경험을 쌓고 있습니다.
            </p>
          </div>
        </div>

        {/* 기술 스택 */}
        <div className="mt-12">
          <SkillGrid />
        </div>

        {/* 경력 & 교육 (2컬럼) */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <TimelineCard heading="경력" items={EXPERIENCE_ITEMS} />
          <TimelineCard heading="교육" items={EDUCATION_ITEMS} />
        </div>
      </div>
    </section>
  );
}
