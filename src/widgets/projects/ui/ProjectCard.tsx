import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";

import type { Project } from "./ProjectsSection";

interface ProjectCardProps {
  project: Project;
}

/** 링크 렌더링 — 기본 콘텐츠와 오버레이에서 공용 사용 */
function ProjectLinks({ project }: { project: Project }) {
  if (!project.github && project.links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3 border-t border-border pt-2">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <Github className="size-4" /> GitHub
        </a>
      )}
      {project.links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ExternalLink className="size-4" /> {link.label}
        </a>
      ))}
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-[--glass-border] bg-[--glass-bg] backdrop-blur-[var(--glass-blur)] transition-transform duration-300 hover:-translate-y-1">
      {/* 이미지 영역 */}
      <div className="flex aspect-video items-center justify-center bg-secondary">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            width={400}
            height={225}
            className="size-full object-cover"
          />
        ) : (
          <span className="text-sm text-muted-foreground">프로젝트 이미지</span>
        )}
      </div>

      {/* 기본 콘텐츠 */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-lg font-medium text-foreground">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {project.description}
        </p>

        {/* 기술 스택 태그 */}
        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.techs.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <ProjectLinks project={project} />
      </div>

      {/* 호버 오버레이 — 카드 전체를 불투명 배경으로 덮음 */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-[--glass-bg] backdrop-blur-[var(--glass-blur)] opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
        <div className="flex flex-col gap-3 overflow-y-auto p-4">
          <h3 className="text-lg font-medium text-foreground">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {/* 기술 스택 태그 */}
          <div className="flex flex-wrap gap-1.5">
            {project.techs.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <ProjectLinks project={project} />
        </div>
      </div>
    </div>
  );
}
