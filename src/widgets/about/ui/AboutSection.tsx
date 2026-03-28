"use client";

import { cn } from "@/shared/lib/utils";
import { SITE_CONFIG, ABOUT_HIGHLIGHTS, CAREER_TIMELINE, BASE_PATH } from "@/shared/config";
import { PlumBlossom } from "@/shared/ui/plum-blossom";
import { useScrollReveal } from "@/shared/lib/hooks/useScrollReveal";

export function AboutSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="relative px-6 py-24">
      <div
        ref={ref}
        className={cn(
          "mx-auto max-w-6xl transition-all duration-700",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        )}
      >
        <h2 className="mb-16 text-center font-heading text-3xl text-gold-gradient md:text-4xl">
          About Me
        </h2>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* 좌측: 프로필 */}
          <div className="flex flex-col items-center gap-6 lg:items-start">
            <img
              src={`${BASE_PATH}/_.jpeg`}
              alt={`${SITE_CONFIG.name} 프로필 사진`}
              className="h-40 w-40 rounded-full object-cover ring-2 ring-gold-500 glow-gold"
            />
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-heading text-moon">{SITE_CONFIG.name}</h3>
              <p className="text-gold-400">{SITE_CONFIG.title}</p>
              <p className="text-moon/60">11년 5개월</p>
            </div>

            <div className="flex w-full flex-col gap-3">
              {ABOUT_HIGHLIGHTS.map((highlight) => (
                <div key={highlight.title} className="glass-card rounded-lg p-4">
                  <h4 className="font-medium text-gold-400">{highlight.title}</h4>
                  <p className="mt-1 text-sm text-moon/80">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 우측: 경력 타임라인 */}
          <div className="relative border-l-2 border-gold-500/30 pl-6">
            {CAREER_TIMELINE.map((item) => (
              <div key={item.period} className="relative mb-8 last:mb-0">
                {/* 금색 원 dot */}
                <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-gold-500" />

                <p className="font-mono text-sm text-gold-400">{item.period}</p>
                <p className="font-medium text-moon">{item.company}</p>
                <p className="text-sm text-moon/60">{item.role}</p>
                {item.description && (
                  <p className="mt-1 text-sm text-moon/50">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 매화 가지 장식 */}
      <div className="mx-auto mt-16 max-w-6xl">
        <PlumBlossom />
      </div>
    </section>
  );
}
