"use client";

import { cn } from "@/shared/lib/utils";
import { SKILLS, GITHUB_USERNAME } from "@/shared/config";
import { TechBadge } from "@/shared/ui/tech-badge";
import { GoldenWave } from "@/shared/ui/golden-wave";
import { useScrollReveal } from "@/shared/lib/hooks/useScrollReveal";
import { useGitHubStats } from "@/widgets/github-stats/lib/useGitHubStats";
import { StatsCard } from "@/widgets/github-stats/ui/StatsCard";
import { TopLanguagesCard } from "@/widgets/github-stats/ui/TopLanguagesCard";

function SkeletonCard() {
  return (
    <div className="glass-card animate-pulse rounded-xl p-6">
      <div className="mb-6 h-6 w-24 rounded bg-gold-500/20" />
      <div className="space-y-4">
        <div className="h-4 w-full rounded bg-gold-500/10" />
        <div className="h-4 w-3/4 rounded bg-gold-500/10" />
        <div className="h-4 w-1/2 rounded bg-gold-500/10" />
      </div>
    </div>
  );
}

export function SkillsSection() {
  const { ref, isVisible } = useScrollReveal();
  const { stats, loading, error } = useGitHubStats(GITHUB_USERNAME);

  const categories = Object.entries(SKILLS) as [string, readonly string[]][];

  return (
    <section id="skills" className="px-6 py-24">
      <div
        ref={ref}
        className={cn(
          "mx-auto max-w-6xl transition-all duration-700",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        )}
      >
        <h2 className="mb-16 text-center font-heading text-3xl text-gold-gradient md:text-4xl">
          Skills & GitHub
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {categories.map(([category, skills]) => (
            <div
              key={category}
              className="glass-card rounded-xl p-5 transition-all duration-300 hover:border hover:border-gold-500/50 hover:glow-gold"
            >
              <h3 className="mb-3 font-heading text-base text-gold-400">
                {category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <TechBadge key={skill} name={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Stats */}
        {!error && (
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
            {loading || !stats ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              <>
                <StatsCard stats={stats} />
                <TopLanguagesCard languages={stats.topLanguages} />
              </>
            )}
          </div>
        )}
      </div>

      <div className="mx-auto mt-16 max-w-6xl">
        <GoldenWave />
      </div>
    </section>
  );
}
