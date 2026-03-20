"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, ChevronDown } from "lucide-react";

import { cn } from "@/shared/lib/utils";

import { useCrossfadeScroll } from "@/shared/lib/hooks/useCrossfadeScroll";
import { assetPath } from "@/shared/lib/utils";

/** 기술 스택 → Cosmic 컬러 매핑 (bg/text) */
const TECH_COLORS: Record<string, string> = {
  // cyan 계열 — 프레임워크
  "Next.js": "bg-[#4DEEEA]/15 text-[#4DEEEA]",
  "Next.js 15": "bg-[#4DEEEA]/15 text-[#4DEEEA]",
  "React.js": "bg-[#4DEEEA]/15 text-[#4DEEEA]",
  "Vue.js": "bg-[#4DEEEA]/15 text-[#4DEEEA]",
  // violet 계열 — 언어/빌드
  TypeScript: "bg-[#764BA2]/20 text-[#c49eea]",
  Vite: "bg-[#764BA2]/20 text-[#c49eea]",
  Turborepo: "bg-[#764BA2]/20 text-[#c49eea]",
  Electron: "bg-[#764BA2]/20 text-[#c49eea]",
  // amber 계열 — 인프라/API
  Docker: "bg-[#FFB86C]/15 text-[#FFB86C]",
  WebRTC: "bg-[#FFB86C]/15 text-[#FFB86C]",
  Twilio: "bg-[#FFB86C]/15 text-[#FFB86C]",
  Spring: "bg-[#FFB86C]/15 text-[#FFB86C]",
  // silver 계열 — 기타
  "Tailwind CSS": "bg-[#E0E0E6]/10 text-[#E0E0E6]",
  WebGL: "bg-[#E0E0E6]/10 text-[#E0E0E6]",
  "Canvas API": "bg-[#E0E0E6]/10 text-[#E0E0E6]",
  PostgreSQL: "bg-[#E0E0E6]/10 text-[#E0E0E6]",
  JSP: "bg-[#E0E0E6]/10 text-[#E0E0E6]",
};

const DEFAULT_TECH_COLOR = "bg-secondary text-secondary-foreground";

/** 기술명 축약 */
const TECH_SHORT: Record<string, string> = {
  "Next.js 15": "Next 15",
  "React.js": "React",
  "Vue.js": "Vue",
  TypeScript: "TS",
  "Tailwind CSS": "Tailwind",
  "Canvas API": "Canvas",
  PostgreSQL: "Postgres",
  Electron: "Electron",
};

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  description: string;
  techs: string[];
  github: string | null;
  links: ProjectLink[];
  image: string | null;
  featured: boolean;
}

const PROJECTS: Project[] = [
  {
    title: "Qpicker 관리자 페이지 · 큐피커 티켓",
    description:
      "인플루언서 마케팅 플랫폼의 관리자 대시보드와 티켓 시스템을 개발했습니다. Next.js 15 기반 Turborepo 모노레포 환경에서 Docker 컨테이너로 배포하며, 복잡한 데이터 필터링과 권한 관리 기능을 구현했습니다.",
    techs: ["Next.js 15", "TypeScript", "Turborepo", "Docker", "Tailwind CSS"],
    github: null,
    links: [
      { label: "Qpicker", url: "https://www.qpicker.com/" },
      { label: "Ticket", url: "https://ticket.qpicker.com/" },
    ],
    image: assetPath("/projects/qpicker-ticket.png"),
    featured: true,
  },
  {
    title: "Textscope — AI OCR 문서인식",
    description:
      "AI 기반 문서인식 서비스의 프론트엔드를 담당했습니다. WebGL과 Canvas API를 활용하여 문서 이미지 위에 OCR 결과를 실시간 오버레이하고, 사용자가 인식 결과를 직접 수정할 수 있는 에디터를 구현했습니다.",
    techs: ["Vue.js", "Vite", "WebGL", "Canvas API", "TypeScript"],
    github: null,
    links: [
      { label: "Textscope", url: "https://www.lomin.ai/textscope-studio" },
    ],
    image: assetPath("/projects/textscope.png"),
    featured: false,
  },
  {
    title: "Pivo — 화상 스트리밍 웹앱",
    description:
      "WebRTC(Twilio) 기반 실시간 화상 통화 및 스트리밍 웹 애플리케이션을 개발했습니다. React.js와 Vue.js를 혼용하고, Electron으로 데스크탑 앱도 지원했습니다.",
    techs: ["React.js", "Vue.js", "Electron", "WebRTC", "Twilio"],
    github: null,
    links: [{ label: "Pivo", url: "https://pivo.kr/" }],
    image: assetPath("/projects/pivo.png"),
    featured: false,
  },
  {
    title: "ESS 통합 모니터링 솔루션",
    description:
      "에너지저장장치(ESS)의 실시간 데이터를 시각화하는 모니터링 대시보드를 개발했습니다. PostgreSQL 기반 시계열 데이터를 차트로 렌더링하고 이상 감지 알림 기능을 구현했습니다.",
    techs: ["Vue.js", "Spring", "PostgreSQL", "JSP"],
    github: null,
    links: [{ label: "Synerzen", url: "https://www.synerzen.co.kr/synerzen_main" }],
    image: assetPath("/projects/ess.png"),
    featured: false,
  },
];

/** progress 기반 스태거 간격 */
const STAGGER_INTERVAL = 0.04;

/** 개별 프로젝트 카드 — 터치/호버로 열고 닫기 */
function ProjectCardItem({
  project,
  visible,
}: {
  project: Project;
  visible: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div
        className={cn(
          "relative z-0 overflow-hidden rounded-lg border bg-[--glass-bg] backdrop-blur-[var(--glass-blur)] transition-all duration-300",
          open ? "z-10 border-primary/30" : "border-[--glass-border]",
        )}
        style={{ boxShadow: "var(--glass-shadow), var(--glass-highlight)" }}
      >
        {/* 기본 상태 — 클릭으로 토글 */}
        <button
          type="button"
          className="grid w-full h-24 grid-cols-[100px_1fr] text-left sm:h-28 sm:grid-cols-[140px_1fr]"
          onClick={() => setOpen((prev) => !prev)}
        >
          {/* 이미지 */}
          <div className="relative shrink-0 overflow-hidden bg-secondary">
            {project.image && (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className={cn(
                  "object-cover transition-transform duration-500",
                  open && "scale-110",
                )}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[--glass-bg]" />
          </div>

          {/* 제목 + 배지 + 링크 */}
          <div className="flex flex-col justify-center gap-1.5 px-3 py-2 sm:gap-2 sm:px-4 sm:py-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-medium leading-tight text-foreground sm:text-sm">
                {project.title}
              </h3>
              <ChevronDown
                className={cn(
                  "size-3.5 shrink-0 text-muted-foreground transition-transform duration-300",
                  open && "rotate-180",
                )}
              />
            </div>
            <div className="flex flex-wrap gap-1">
              {/* 모바일 3개, 데스크탑 4개 */}
              {project.techs.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className={`rounded-full px-2 py-px text-[8px] font-medium sm:text-[9px] ${TECH_COLORS[tech] ?? DEFAULT_TECH_COLOR}`}
                >
                  {TECH_SHORT[tech] ?? tech}
                </span>
              ))}
              {/* 데스크탑에서만 4번째 배지 표시 */}
              {project.techs[3] && (
                <span
                  className={`hidden rounded-full px-2 py-px text-[9px] font-medium sm:inline ${TECH_COLORS[project.techs[3]] ?? DEFAULT_TECH_COLOR}`}
                >
                  {TECH_SHORT[project.techs[3]] ?? project.techs[3]}
                </span>
              )}
              {project.techs.length > 4 && (
                <span className="rounded-full bg-secondary px-2 py-px text-[8px] font-medium text-secondary-foreground sm:text-[9px]">
                  +{project.techs.length - 4}
                </span>
              )}
            </div>
            {project.links.length > 0 && (
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] text-primary transition-colors hover:text-foreground"
                  >
                    <ExternalLink className="size-2.5" /> {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </button>

        {/* 아코디언 패널 */}
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-300",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <div className="border-t border-border/30 px-4 py-3">
              <p className="text-xs leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const { style, progress } = useCrossfadeScroll(2, 4);

  // 스태거: 섹션 헤더 -> 카드 4개 순서
  const isHeaderVisible = progress > 0.3;

  return (
    <div
      id="projects"
      className="fixed inset-0 z-[13] flex items-center"
      style={style}
    >
      <div className="w-full will-change-[transform,opacity]">
        <div className="mx-auto max-w-5xl px-6 md:px-12 lg:px-24">
          <div className="rounded-xl border border-[--glass-border] bg-[--glass-bg] p-6 backdrop-blur-[var(--glass-blur)]" style={{ boxShadow: "var(--glass-shadow), var(--glass-highlight)" }}>
            {/* 섹션 헤더 */}
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: isHeaderVisible ? 1 : 0,
                transform: isHeaderVisible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                PROJECTS
              </p>
              <h2 className="mt-2 text-3xl font-medium text-foreground">
                프로젝트
              </h2>
              <p className="mt-2 max-w-lg text-[15px] text-muted-foreground">
                직접 설계하고 구현한 프로젝트들입니다.
              </p>
            </div>

            {/* 프로젝트 카드 — 터치/클릭으로 아코디언 토글 */}
            <div className="mt-6 space-y-3">
              {PROJECTS.map((project, i) => (
                <ProjectCardItem
                  key={project.title}
                  project={project}
                  visible={progress > 0.3 + (i + 1) * STAGGER_INTERVAL}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
