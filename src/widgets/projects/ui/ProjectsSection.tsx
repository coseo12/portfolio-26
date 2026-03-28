"use client";

import { ExternalLink } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useScrollReveal } from "@/shared/lib/hooks/useScrollReveal";
import { PROJECTS } from "@/shared/config";

const featuredProjects = PROJECTS.filter((p) => p.featured);
const regularProjects = PROJECTS.filter((p) => !p.featured);

function TechTag({ tech }: { tech: string }) {
  return (
    <span className="bg-ink-700 text-gold-400 text-xs px-3 py-1 rounded-full font-mono">
      {tech}
    </span>
  );
}

function ProjectLinks({ project }: { project: (typeof PROJECTS)[number] }) {
  if (!project.demo && !project.github) return null;
  return (
    <div className="flex gap-3 mt-4">
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} 데모 (새 탭에서 열기)`}
          className="inline-flex items-center gap-1.5 text-sm text-gold-400 hover:text-gold-300 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Demo
        </a>
      )}
    </div>
  );
}

function FeaturedProjectCard({
  project,
}: {
  project: (typeof PROJECTS)[number];
}) {
  return (
    <div className="bg-ink-800 rounded-xl overflow-hidden border border-gold-500/10 hover:border-gold-500/30 transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <img
          src={project.image}
          alt={project.title}
          className="rounded-lg object-cover aspect-video w-full"
        />
        <div className="flex flex-col justify-center p-6 lg:p-0 lg:pr-6">
          <h3 className="text-2xl font-heading text-moon">{project.title}</h3>
          <p className="text-moon/70 text-base leading-relaxed mt-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.techs.map((tech) => (
              <TechTag key={tech} tech={tech} />
            ))}
          </div>
          <ProjectLinks project={project} />
        </div>
      </div>
    </div>
  );
}

function RegularProjectCard({
  project,
}: {
  project: (typeof PROJECTS)[number];
}) {
  return (
    <div className="group bg-ink-800 rounded-xl overflow-hidden border-b-2 border-gold-500/30">
      <div className="relative">
        <img
          src={project.image}
          alt={project.title}
          className="aspect-video object-cover w-full"
        />
        <div className="absolute inset-0 bg-ink-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="flex flex-wrap gap-2 justify-center px-4">
            {project.techs.map((tech) => (
              <TechTag key={tech} tech={tech} />
            ))}
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-heading text-moon">{project.title}</h3>
        <p className="text-moon/60 text-sm line-clamp-2 mt-2">
          {project.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-wrap gap-1.5">
            {project.techs.map((tech) => (
              <TechTag key={tech} tech={tech} />
            ))}
          </div>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} 데모`}
              className="text-gold-400 hover:text-gold-300 transition-colors shrink-0 ml-2"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="projects" className="py-20 px-4 max-w-6xl mx-auto">
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700",
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        )}
      >
        <h2 className="font-heading text-gold-gradient text-3xl md:text-4xl text-center mb-12">
          Projects
        </h2>

        {/* Featured 프로젝트 */}
        <div className="grid grid-cols-1 gap-8">
          {featuredProjects.map((project) => (
            <FeaturedProjectCard key={project.title} project={project} />
          ))}
        </div>

        {/* 일반 프로젝트 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {regularProjects.map((project) => (
            <RegularProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
