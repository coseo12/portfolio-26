"use client";

import Image from "next/image";

import { useCrossfadeScroll } from "@/shared/lib/hooks/useCrossfadeScroll";
import { assetPath } from "@/shared/lib/utils";

/** 기술 스택 → Cosmic 컬러 매핑 */
const SKILL_COLORS: Record<string, string> = {
  // cyan 계열 — 프레임워크
  React: "bg-[#4DEEEA]/15 text-[#4DEEEA]",
  "Next.js": "bg-[#4DEEEA]/15 text-[#4DEEEA]",
  "Vue.js": "bg-[#4DEEEA]/15 text-[#4DEEEA]",
  "Tailwind CSS": "bg-[#4DEEEA]/15 text-[#4DEEEA]",
  Electron: "bg-[#4DEEEA]/15 text-[#4DEEEA]",
  // violet 계열 — 언어/AI
  TypeScript: "bg-[#764BA2]/20 text-[#c49eea]",
  "Claude API": "bg-[#764BA2]/20 text-[#c49eea]",
  "OpenAI API": "bg-[#764BA2]/20 text-[#c49eea]",
  "Agent SDK": "bg-[#764BA2]/20 text-[#c49eea]",
  LangChain: "bg-[#764BA2]/20 text-[#c49eea]",
  MCP: "bg-[#764BA2]/20 text-[#c49eea]",
  RAG: "bg-[#764BA2]/20 text-[#c49eea]",
  // amber 계열 — 인프라
  Docker: "bg-[#FFB86C]/15 text-[#FFB86C]",
  WebRTC: "bg-[#FFB86C]/15 text-[#FFB86C]",
  "Canvas API": "bg-[#FFB86C]/15 text-[#FFB86C]",
  WebGL: "bg-[#FFB86C]/15 text-[#FFB86C]",
  "Web Audio API": "bg-[#FFB86C]/15 text-[#FFB86C]",
  // silver 계열 — 백엔드/DB
  "Node.js": "bg-[#E0E0E6]/10 text-[#E0E0E6]",
  Spring: "bg-[#E0E0E6]/10 text-[#E0E0E6]",
  MySQL: "bg-[#E0E0E6]/10 text-[#E0E0E6]",
  PostgreSQL: "bg-[#E0E0E6]/10 text-[#E0E0E6]",
  MongoDB: "bg-[#E0E0E6]/10 text-[#E0E0E6]",
  Git: "bg-[#E0E0E6]/10 text-[#E0E0E6]",
  Turborepo: "bg-[#E0E0E6]/10 text-[#E0E0E6]",
  Vite: "bg-[#E0E0E6]/10 text-[#E0E0E6]",
};

const DEFAULT_SKILL_COLOR = "bg-secondary text-secondary-foreground";

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

/** 스킬 데이터 — 카테고리별 인라인 배지용 */
const SKILL_DATA = [
  { label: "Frontend", skills: ["TypeScript", "React", "Next.js", "Vue.js", "Tailwind CSS", "Electron"] },
  { label: "Backend", skills: ["Node.js", "Spring", "MySQL", "PostgreSQL", "MongoDB"] },
  { label: "AI / Agent", skills: ["Claude API", "LangChain", "OpenAI API", "Agent SDK", "MCP", "RAG"] },
  { label: "Infra", skills: ["Docker", "WebRTC", "Canvas API", "WebGL", "Web Audio API"] },
];

export function AboutSection() {
  const { style, progress } = useCrossfadeScroll(1, 4);

  /** 내부 요소 스태거 */
  const isHeaderVisible = progress > 0.3;
  const isProfileVisible = progress > 0.5;
  const isSkillVisible = progress > 0.7;
  const isCareerVisible = progress > 0.9;

  return (
    <div
      id="about"
      className="fixed inset-0 z-[12] flex items-center"
      style={style}
    >
      <div className="w-full will-change-[transform,opacity]">
        <div className="mx-auto max-w-5xl px-6 md:px-12 lg:px-24">
          <div className="rounded-xl border border-[--glass-border] bg-[--glass-bg] p-4 backdrop-blur-[var(--glass-blur)] sm:p-6" style={{ boxShadow: "var(--glass-shadow), var(--glass-highlight)" }}>
            {/* 섹션 헤더 */}
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: isHeaderVisible ? 1 : 0,
                transform: isHeaderVisible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                ABOUT ME
              </p>
              <h2 className="mt-1 text-2xl font-medium text-foreground sm:mt-2 sm:text-3xl">
                저를 소개합니다
              </h2>
            </div>

            {/* 프로필 — 모바일: 세로 / 데스크탑: 가로 인라인 */}
            <div
              className="mt-4 flex flex-col gap-3 transition-all duration-700 ease-out sm:mt-6 sm:flex-row sm:items-start sm:gap-4"
              style={{
                opacity: isProfileVisible ? 1 : 0,
                transform: isProfileVisible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <div className="flex items-center gap-3 sm:block">
                <Image
                  src={assetPath("/me.jpeg")}
                  alt="서창오"
                  width={64}
                  height={64}
                  className="size-12 shrink-0 rounded-full object-cover sm:size-16"
                />
                {/* 모바일에서만 이름을 이미지 옆에 표시 */}
                <div className="sm:hidden">
                  <h3 className="text-sm font-medium text-foreground">서창오</h3>
                  <span className="text-xs text-muted-foreground">Software Engineer</span>
                </div>
              </div>
              <div>
                {/* 데스크탑에서 이름 + 직함 */}
                <div className="hidden items-center gap-2 sm:flex">
                  <h3 className="text-lg font-medium text-foreground">서창오</h3>
                  <span className="text-sm text-muted-foreground">
                    Software Engineer · 서울 광진구
                  </span>
                  <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                    구직 중
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground sm:mt-1 sm:text-[15px]">
                  다양한 프레임워크 경험을 바탕으로 사용자 중심의 웹 애플리케이션을 만들고 있습니다.
                  최근에는 LLM 기반 AI Agent 설계와 Claude API·LangChain을 활용한
                  지능형 워크플로우 구축에 집중하고 있습니다.
                </p>
              </div>
            </div>

            {/* 기술 스택 — 인라인 배지 */}
            <div
              className="mt-4 space-y-1.5 transition-all duration-700 ease-out sm:mt-6 sm:space-y-2"
              style={{
                opacity: isSkillVisible ? 1 : 0,
                transform: isSkillVisible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                기술 스택
              </h3>
              {SKILL_DATA.map(({ label, skills }) => (
                <div key={label} className="flex flex-wrap items-center gap-1.5 sm:flex-nowrap sm:gap-2">
                  <span className="w-full text-[10px] font-medium text-primary sm:w-20 sm:shrink-0 sm:text-xs">
                    {label}
                  </span>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className={`rounded-full px-2 py-px text-[9px] font-medium sm:px-2.5 sm:py-0.5 sm:text-[11px] ${SKILL_COLORS[skill] ?? DEFAULT_SKILL_COLOR}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 경력 */}
            <div
              className="mt-4 transition-all duration-700 ease-out sm:mt-6"
              style={{
                opacity: isCareerVisible ? 1 : 0,
                transform: isCareerVisible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                경력
              </h3>
              <div className="mt-2 space-y-1.5">
                {EXPERIENCE_ITEMS.map((item) => (
                  <div
                    key={`${item.organization}-${item.period}`}
                    className="text-xs sm:text-sm"
                  >
                    {/* 모바일: 2행 레이아웃 / 데스크탑: 1행 */}
                    <div className="flex items-center justify-between gap-1 sm:hidden">
                      <span className="font-medium text-foreground">{item.title}</span>
                      <span className="shrink-0 text-[10px] text-muted-foreground">{item.period}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground sm:hidden">{item.organization}</span>
                    {/* 데스크탑 */}
                    <div className="hidden items-center gap-2 sm:flex">
                      <span className="w-28 shrink-0 text-muted-foreground">{item.organization}</span>
                      <span className="flex-1 text-foreground">{item.title}</span>
                      <span className="shrink-0 text-xs text-muted-foreground">{item.period}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 교육 */}
              <p className="mt-2 text-[10px] text-muted-foreground sm:mt-3 sm:text-xs">
                두원공과대학교 컴퓨터정보과 · 전기산업기사 · 한국소프트웨어인재개발원 최우수상
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
