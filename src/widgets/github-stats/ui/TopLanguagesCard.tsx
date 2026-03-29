"use client";

import type { LanguageStat } from "../lib/types";

interface TopLanguagesCardProps {
  languages: LanguageStat[];
}

export function TopLanguagesCard({ languages }: TopLanguagesCardProps) {
  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="mb-6 font-heading text-lg text-gold-400">
        Top Languages
      </h3>
      <div className="space-y-4">
        {languages.map(({ name, percentage }) => (
          <div key={name}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm text-moon/80">{name}</span>
              <span className="font-mono text-xs text-moon/50">
                {percentage}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-ink-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-700"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
