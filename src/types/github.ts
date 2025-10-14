/**
 * GitHub API Types for Portfolio Integration
 *
 * These types define the structure of GitHub data used throughout the portfolio
 * for dynamic repository statistics, recent commits, and project information.
 */

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  clone_url: string;
  ssh_url: string;
  language: string | null;
  languages_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  size: number;
  default_branch: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  archived: boolean;
  disabled: boolean;
  private: boolean;
  fork: boolean;
  forks: number;
  open_issues: number;
  watchers: number;
  owner: GitHubOwner;
  license: GitHubLicense | null;
}

export interface GitHubOwner {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  type: string;
}

export interface GitHubLicense {
  key: string;
  name: string;
  spdx_id: string;
  url: string | null;
}

export interface GitHubCommit {
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    committer: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
    comment_count: number;
    tree: {
      sha: string;
      url: string;
    };
    url: string;
    verification?: {
      verified: boolean;
      reason: string;
      signature: string | null;
      payload: string | null;
    };
  };
  html_url: string;
  author: GitHubUser | null;
  committer: GitHubUser | null;
  parents: Array<{
    sha: string;
    url: string;
    html_url: string;
  }>;
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  type: string;
}

export interface GitHubLanguage {
  [language: string]: number;
}

export interface GitHubStats {
  totalRepositories: number;
  totalStars: number;
  totalForks: number;
  totalCommits: number;
  mostUsedLanguages: Array<{
    language: string;
    count: number;
    percentage: number;
  }>;
  recentActivity: GitHubCommit[];
  repositories: GitHubRepository[];
}

export interface GitHubRepoStats {
  stars: number;
  forks: number;
  issues: number;
  watchers: number;
  size: number;
  language: string | null;
  languages: GitHubLanguage;
  lastUpdated: string;
  createdAt: string;
  recentCommits: GitHubCommit[];
}

export interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  githubData?: GitHubRepoStats;
}
