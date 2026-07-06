"use client";

import { ExternalLink } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { GithubIcon } from "@/shared/ui/github-icon";
import { TechBadge } from "@/shared/ui/tech-badge";
import { Constellation } from "@/shared/ui/constellation";
import { useScrollReveal } from "@/shared/lib/hooks/useScrollReveal";
import { SIDE_PROJECT } from "@/shared/config";

function MetricCard({
  metric,
}: {
  metric: (typeof SIDE_PROJECT.metrics)[number];
}) {
  return (
    <div className="bg-ink-800 rounded-xl border border-gold-500/10 p-6 text-center">
      <p className="font-heading text-gold-gradient text-3xl md:text-4xl">
        {metric.value}
      </p>
      <p className="text-moon mt-2 text-sm font-medium">{metric.label}</p>
      <p className="text-moon/50 mt-1 text-xs">{metric.detail}</p>
    </div>
  );
}

function FeatureCard({
  feature,
}: {
  feature: (typeof SIDE_PROJECT.features)[number];
}) {
  return (
    <div className="bg-ink-800 rounded-xl border-b-2 border-gold-500/30 p-5">
      <h4 className="font-heading text-moon text-base">{feature.title}</h4>
      <p className="text-moon/60 mt-2 text-sm leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}

export function SideProjectSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="side-project" className="mx-auto max-w-6xl px-4 py-20">
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        )}
      >
        <h2 className="font-heading text-gold-gradient mb-12 text-center text-3xl md:text-4xl">
          {SIDE_PROJECT.label}
        </h2>

        {/* 메인 스포트라이트 카드 */}
        <div className="bg-ink-800 overflow-hidden rounded-xl border border-gold-500/10 transition-all duration-300 hover:border-gold-500/30">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <a
              href={SIDE_PROJECT.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${SIDE_PROJECT.title} 라이브 데모 (새 탭에서 열기)`}
              className="group relative lg:col-span-3"
            >
              <img
                src={SIDE_PROJECT.image}
                alt={`${SIDE_PROJECT.title} — 태양계 시뮬레이션 화면`}
                className="aspect-video h-full w-full object-cover"
              />
              {/* 호버 시 데모 안내 오버레이 */}
              <div className="bg-ink-900/60 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-gold-300 inline-flex items-center gap-2 text-sm font-medium">
                  <ExternalLink className="h-4 w-4" />
                  라이브 데모 열기
                </span>
              </div>
            </a>

            <div className="flex flex-col justify-center p-6 lg:col-span-2 lg:p-8">
              <p className="text-gold-400 text-xs font-medium tracking-widest uppercase">
                Personal Project
              </p>
              <h3 className="font-heading text-moon mt-2 text-2xl md:text-3xl">
                {SIDE_PROJECT.title}
              </h3>
              <p className="text-gold-300/80 mt-2 text-sm">
                {SIDE_PROJECT.tagline}
              </p>
              <p className="text-moon/70 mt-4 text-sm leading-relaxed">
                {SIDE_PROJECT.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {SIDE_PROJECT.techs.map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={SIDE_PROJECT.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:glow-gold text-gold-400 border-gold-500 bg-ink-900/60 inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:bg-gold-500/10"
                >
                  <ExternalLink className="h-4 w-4" />
                  라이브 데모
                </a>
                <a
                  href={SIDE_PROJECT.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-moon/80 border-ink-600 hover:border-gold-500/40 hover:text-moon inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-all duration-300"
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 핵심 지표 */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {SIDE_PROJECT.metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>

        {/* 기능 하이라이트 */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SIDE_PROJECT.features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>

        <div className="mt-16">
          <Constellation />
        </div>
      </div>
    </section>
  );
}
