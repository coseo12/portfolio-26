"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { ProfileCard } from "./ProfileCard";
import { SkillGrid } from "./SkillGrid";
import { TimelineCard } from "./TimelineCard";

/** 경력 데이터 */
const EXPERIENCE_ITEMS = [
  {
    title: "프론트엔드 개발자",
    organization: "스페이스애드",
    period: "2025.06 – 2025.08",
    description: "프론트엔드 개발 (조직 개편으로 계약 만료)",
  },
  {
    title: "PDM · Frontend Developer",
    organization: "피플리",
    period: "2023.09 – 2025.04",
    description:
      "Qpicker App 관리자 페이지, 하리보 50주년 랜딩페이지, 큐피커 티켓 페이지 (Next.js 15, Turborepo, Docker)",
  },
  {
    title: "연구원",
    organization: "㈜Lomin",
    period: "2022.02 – 2023.02",
    description:
      "AI OCR 문서인식 서비스 Textscope 프론트엔드 (Vue.js, Vite, WebGL, Canvas API)",
  },
  {
    title: "SWE 사원",
    organization: "쓰리아이",
    period: "2021.06 – 2022.01",
    description:
      "Pivo 화상 스트리밍 웹앱 (React.js, Vue.js, Electron, WebRTC/Twilio)",
  },
  {
    title: "솔루션사업부 주임",
    organization: "노스스타컨설팅",
    period: "2020.01 – 2021.03",
    description:
      "HMS 고도화 SI, 공통 UI 컴포넌트 라이브러리 설계 (Vue.js, Spring)",
  },
  {
    title: "전임연구원",
    organization: "시너젠 연구소",
    period: "2018.08 – 2019.09",
    description:
      "ESS 통합 모니터링 솔루션, 실시간 데이터 시각화 (Vue.js, Spring, PostgreSQL)",
  },
];

/** 교육 데이터 */
const EDUCATION_ITEMS = [
  {
    title: "컴퓨터정보과",
    organization: "두원공과대학교",
    period: "2005 – 2011",
    description: "학점 3.37/4.0",
  },
  {
    title: "전기산업기사",
    organization: "한국산업인력공단",
    period: "2014",
  },
  {
    title: "Vue.js 정복 CAMP / PWA CAMP",
    organization: "패스트캠퍼스",
    period: "2019",
  },
  {
    title: "응용S/W엔지니어링 웹모바일 양성과정",
    organization: "한국소프트웨어인재개발원",
    period: "2018",
    description: "출석률 100% 특모범상, 최우수상 수상",
  },
];

export function AboutSection() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  // Hero 배경이 검정 계열이므로 그라디언트 시작색을 테마에 맞춤
  const gradientFrom =
    mounted && resolvedTheme === "dark"
      ? "from-[hsl(222,25%,8%)]"
      : "from-black";

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
              7년차 소프트웨어 엔지니어입니다. React, Next.js, Vue.js 등 다양한
              프레임워크 경험을 바탕으로 사용자 중심의 웹 애플리케이션을 만들고
              있습니다.
            </p>
            <p>
              AI OCR 문서인식 서비스, 화상 스트리밍 웹앱, 실시간 모니터링
              솔루션 등 다양한 도메인에서 프론트엔드를 설계하고 구현해왔습니다.
              WebGL, Canvas API, WebRTC 같은 브라우저 고급 API 활용에도
              익숙합니다.
            </p>
            <p>
              최근에는 Next.js 15와 Turborepo를 활용한 모노레포 환경에서
              프로덕트를 개발하고, LangChain·OpenAI API를 연동한 AI 기능
              구현에도 관심을 가지고 있습니다.
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
