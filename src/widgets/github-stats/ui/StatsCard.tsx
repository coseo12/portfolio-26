"use client";

import { Star, GitFork, FolderGit2, Users } from "lucide-react";
import type { GitHubStats } from "../lib/types";

interface StatsCardProps {
  stats: GitHubStats;
}

const STAT_ITEMS = [
  { key: "totalStars", label: "Stars", icon: Star },
  { key: "totalForks", label: "Forks", icon: GitFork },
  { key: "publicRepos", label: "Repos", icon: FolderGit2 },
  { key: "followers", label: "Followers", icon: Users },
] as const;

export function StatsCard({ stats }: StatsCardProps) {
  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="mb-6 font-heading text-lg text-gold-400">Stats</h3>
      <div className="grid grid-cols-2 gap-4">
        {STAT_ITEMS.map(({ key, label, icon: Icon }) => (
          <div key={key} className="flex items-center gap-3">
            <Icon className="h-5 w-5 text-gold-500/70" />
            <div>
              <p className="font-heading text-2xl text-gold-400">
                {stats[key]}
              </p>
              <p className="text-sm text-moon/60">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
