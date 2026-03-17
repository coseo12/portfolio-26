import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";

import type { Project } from "./ProjectsSection";

interface FeaturedProjectCardProps {
  project: Project;
}

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-lg border border-border bg-card lg:grid-cols-2">
      {/* 이미지 영역 */}
      <div className="flex aspect-video items-center justify-center bg-secondary lg:aspect-auto">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={400}
            className="size-full object-cover"
          />
        ) : (
          <span className="text-sm text-muted-foreground">프로젝트 이미지</span>
        )}
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col justify-between gap-4 p-6">
        <div className="space-y-3">
          <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            Featured
          </span>
          <h3 className="text-2xl font-medium text-foreground">
            {project.title}
          </h3>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        <div className="space-y-3">
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

          {/* 링크 */}
          {(project.github || project.links.length > 0) && (
            <div className="flex flex-wrap gap-3 border-t border-border pt-3">
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
          )}
        </div>
      </div>
    </div>
  );
}
