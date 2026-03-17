import { Monitor, Database, Wrench, Cloud } from "lucide-react";

import type { LucideIcon } from "lucide-react";

/** 기술 스택 카테고리 데이터 */
interface SkillCategory {
  icon: LucideIcon;
  label: string;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    icon: Monitor,
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    icon: Database,
    label: "State & Data",
    skills: ["Zustand", "TanStack Query", "React Hook Form"],
  },
  {
    icon: Wrench,
    label: "Tools",
    skills: ["Git", "GitHub Actions", "Figma", "Storybook"],
  },
  {
    icon: Cloud,
    label: "Infra",
    skills: ["Vercel", "AWS (S3, CloudFront)", "Docker"],
  },
];

export function SkillGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {SKILL_CATEGORIES.map(({ icon: Icon, label, skills }) => (
        <div
          key={label}
          className="rounded-lg border border-border bg-card p-4"
        >
          <Icon className="size-5 text-primary" />
          <h4 className="mt-2 text-lg font-medium text-foreground">{label}</h4>
          <ul className="mt-2 space-y-1">
            {skills.map((skill) => (
              <li key={skill} className="text-sm text-muted-foreground">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
