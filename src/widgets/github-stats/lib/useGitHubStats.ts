"use client";

import { useState, useEffect } from "react";
import type { GitHubStats } from "./types";

const CACHE_KEY = "github-stats";
const CACHE_TTL = 60 * 60 * 1000; // 1시간

interface CacheEntry {
  data: GitHubStats;
  timestamp: number;
}

function getCached(): GitHubStats | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_TTL) {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function setCache(data: GitHubStats) {
  try {
    const entry: CacheEntry = { data, timestamp: Date.now() };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // sessionStorage 용량 초과 등 무시
  }
}

export function useGitHubStats(username: string) {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = getCached();
    if (cached) {
      setStats(cached);
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
          ),
        ]);

        if (!userRes.ok || !reposRes.ok) {
          throw new Error("GitHub API 요청 실패");
        }

        const user = await userRes.json();
        const repos = await reposRes.json();

        let totalStars = 0;
        let totalForks = 0;
        const langMap: Record<string, number> = {};

        for (const repo of repos) {
          if (repo.fork) continue; // 포크한 저장소 제외
          totalStars += repo.stargazers_count ?? 0;
          totalForks += repo.forks_count ?? 0;
          if (repo.language) {
            langMap[repo.language] = (langMap[repo.language] || 0) + 1;
          }
        }

        const totalLangCount = Object.values(langMap).reduce(
          (a, b) => a + b,
          0
        );
        const topLanguages = Object.entries(langMap)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([name, count]) => ({
            name,
            count,
            percentage: Math.round((count / totalLangCount) * 100),
          }));

        const data: GitHubStats = {
          publicRepos: user.public_repos,
          followers: user.followers,
          totalStars,
          totalForks,
          topLanguages,
        };

        setCache(data);
        setStats(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "알 수 없는 오류");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [username]);

  return { stats, loading, error };
}
