export interface GitHubStats {
  publicRepos: number;
  followers: number;
  totalStars: number;
  totalForks: number;
  topLanguages: LanguageStat[];
}

export interface LanguageStat {
  name: string;
  count: number;
  percentage: number;
}
