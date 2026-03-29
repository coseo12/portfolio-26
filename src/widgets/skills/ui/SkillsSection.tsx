"use client";

import { cn } from "@/shared/lib/utils";
import { SKILLS } from "@/shared/config";
import { TechBadge } from "@/shared/ui/tech-badge";
import { useScrollReveal } from "@/shared/lib/hooks/useScrollReveal";

export function SkillsSection() {
  const { ref, isVisible } = useScrollReveal();

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
          Skills
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
      </div>
    </section>
  );
}
