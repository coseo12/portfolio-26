import { assetPath } from "@/shared/lib/utils";

import { FeaturedProjectCard } from "./FeaturedProjectCard";
import { ProjectCard } from "./ProjectCard";

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

export function ProjectsSection() {
  const featuredProject = PROJECTS.find((p) => p.featured);
  const normalProjects = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative min-h-screen bg-muted pt-16">
      {/* 상단 그라디언트 페이드 -- About에서 Projects로 전환 */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-24 bg-gradient-to-b from-background to-transparent"
        aria-hidden="true"
      />

      {/* 콘텐츠 */}
      <div className="relative mx-auto max-w-5xl px-6 py-16 md:px-12 lg:px-24">
        {/* 섹션 헤더 */}
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          PROJECTS
        </p>
        <h2 className="mt-2 text-3xl font-medium text-foreground">
          프로젝트
        </h2>
        <p className="mt-2 max-w-lg text-[15px] text-muted-foreground">
          직접 설계하고 구현한 프로젝트들입니다. 각 프로젝트에서 어떤 문제를
          해결했는지에 초점을 맞추었습니다.
        </p>

        {/* Featured 프로젝트 */}
        {featuredProject && (
          <div className="mt-12">
            <FeaturedProjectCard project={featuredProject} />
          </div>
        )}

        {/* 일반 프로젝트 그리드 */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {normalProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
