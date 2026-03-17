import { Github, ExternalLink } from "lucide-react";

import { FeaturedProjectCard } from "./FeaturedProjectCard";
import { ProjectCard } from "./ProjectCard";

export interface Project {
  title: string;
  description: string;
  techs: string[];
  github: string | null;
  live: string | null;
  featured: boolean;
}

const PROJECTS: Project[] = [
  {
    title: "E-Commerce 대시보드",
    description:
      "실시간 매출 데이터 시각화와 주문 관리 기능을 제공하는 어드민 대시보드. 복잡한 필터링과 차트 인터랙션을 최적화했습니다.",
    techs: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Zustand"],
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "실시간 채팅 앱",
    description:
      "WebSocket 기반 실시간 메시징 애플리케이션. 읽음 확인, 타이핑 인디케이터, 파일 전송을 지원합니다.",
    techs: ["React", "Socket.io", "Express", "MongoDB"],
    github: "#",
    live: "#",
    featured: false,
  },
  {
    title: "블로그 플랫폼",
    description:
      "마크다운 에디터와 SSG를 활용한 개인 블로그. SEO 최적화와 다크모드를 지원합니다.",
    techs: ["Next.js", "MDX", "Tailwind CSS", "Vercel"],
    github: "#",
    live: null,
    featured: false,
  },
  {
    title: "할 일 관리 앱",
    description:
      "드래그 앤 드롭 기반 칸반 보드. 로컬 스토리지 영속화와 PWA를 지원합니다.",
    techs: ["React", "TypeScript", "dnd-kit", "Zustand"],
    github: "#",
    live: "#",
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
