/**
 * GitHub API Utilities for Portfolio Integration
 *
 * This module provides utilities for fetching and processing GitHub data
 * including repository statistics, recent commits, and language information.
 */

import {
  GitHubRepository,
  GitHubCommit,
  GitHubLanguage,
  GitHubStats,
  GitHubRepoStats,
} from "@/types/github";

/**
 * GitHub API configuration
 */
const GITHUB_API_BASE = "https://api.github.com";
const USERNAME = "Cyrochrome"; // GitHub username from portfolio

/**
 * Get GitHub token from environment variables
 */
function getGitHubToken(): string | null {
  // In Next.js, environment variables are available at runtime
  if (typeof window === 'undefined') {
    // Server-side
    return process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN || null;
  }
  // Client-side
  return null;
}

/**
 * Get authorization headers for GitHub API
 */
function getGitHubHeaders(): Record<string, string> {
  const token = getGitHubToken();
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `token ${token}`;
  }

  return headers;
}

/**
 * Fetch user repositories from GitHub API
 */
export async function fetchUserRepositories(): Promise<GitHubRepository[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers: getGitHubHeaders(),
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repositories: GitHubRepository[] = await response.json();

    // Filter out archived repositories and sort by last updated
    return repositories
      .filter((repo) => !repo.archived && !repo.disabled)
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
}

/**
 * Fetch detailed information about a specific repository
 */
export async function fetchRepositoryDetails(repoName: string): Promise<GitHubRepository | null> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${USERNAME}/${repoName}`,
      {
        headers: getGitHubHeaders(),
        next: { revalidate: 1800 }, // Cache for 30 minutes
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        // Repository not found - return null instead of throwing
        return null;
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching repository ${repoName}:`, error);
    return null;
  }
}

/**
 * Fetch languages used in a repository
 */
export async function fetchRepositoryLanguages(repoName: string): Promise<GitHubLanguage> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${USERNAME}/${repoName}/languages`,
      {
        headers: getGitHubHeaders(),
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        // Repository not found - return empty object instead of throwing
        return {};
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching languages for ${repoName}:`, error);
    return {};
  }
}

/**
 * Fetch recent commits from a repository
 */
export async function fetchRepositoryCommits(
  repoName: string,
  limit: number = 10
): Promise<GitHubCommit[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${USERNAME}/${repoName}/commits?per_page=${limit}`,
      {
        headers: getGitHubHeaders(),
        next: { revalidate: 900 }, // Cache for 15 minutes
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        // Repository not found - return empty array instead of throwing
        return [];
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const commits: GitHubCommit[] = await response.json();
    return commits.slice(0, limit);
  } catch (error) {
    console.error(`Error fetching commits for ${repoName}:`, error);
    return [];
  }
}

/**
 * Get comprehensive repository statistics
 */
export async function getRepositoryStats(repoName: string): Promise<GitHubRepoStats | null> {
  try {
    const [repoDetails, languages, commits] = await Promise.all([
      fetchRepositoryDetails(repoName),
      fetchRepositoryLanguages(repoName),
      fetchRepositoryCommits(repoName, 5),
    ]);

    if (!repoDetails) {
      return null;
    }

    // Calculate primary language
    const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
    const primaryLanguage = totalBytes > 0
      ? Object.entries(languages).sort(([, a], [, b]) => b - a)[0][0]
      : null;

    return {
      stars: repoDetails.stargazers_count,
      forks: repoDetails.forks_count,
      issues: repoDetails.open_issues_count,
      watchers: repoDetails.watchers_count,
      size: repoDetails.size,
      language: primaryLanguage,
      languages,
      lastUpdated: repoDetails.updated_at,
      createdAt: repoDetails.created_at,
      recentCommits: commits,
    };
  } catch (error) {
    console.error(`Error getting stats for ${repoName}:`, error);
    return null;
  }
}

/**
 * Get overall GitHub statistics for the user
 */
export async function getGitHubStats(): Promise<GitHubStats> {
  try {
    const repositories = await fetchUserRepositories();

    // Calculate totals
    const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repositories.reduce((sum, repo) => sum + repo.forks_count, 0);

    // Get all languages across repositories
    const languageCounts: { [key: string]: number } = {};
    const languagePromises = repositories.map(async (repo) => {
      const languages = await fetchRepositoryLanguages(repo.name);
      Object.entries(languages).forEach(([language, bytes]) => {
        languageCounts[language] = (languageCounts[language] || 0) + bytes;
      });
    });

    await Promise.all(languagePromises);

    // Calculate most used languages
    const totalLanguageBytes = Object.values(languageCounts).reduce((sum, bytes) => sum + bytes, 0);
    const mostUsedLanguages = Object.entries(languageCounts)
      .map(([language, bytes]) => ({
        language,
        count: bytes,
        percentage: totalLanguageBytes > 0 ? (bytes / totalLanguageBytes) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Get recent commits across all repositories
    const recentCommitsPromises = repositories.slice(0, 5).map(repo =>
      fetchRepositoryCommits(repo.name, 3)
    );
    const recentCommitsArrays = await Promise.all(recentCommitsPromises);
    const recentActivity = recentCommitsArrays
      .flat()
      .sort((a, b) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime())
      .slice(0, 10);

    return {
      totalRepositories: repositories.length,
      totalStars,
      totalForks,
      totalCommits: recentActivity.length,
      mostUsedLanguages,
      recentActivity,
      repositories,
    };
  } catch (error) {
    console.error("Error getting GitHub stats:", error);
    return {
      totalRepositories: 0,
      totalStars: 0,
      totalForks: 0,
      totalCommits: 0,
      mostUsedLanguages: [],
      recentActivity: [],
      repositories: [],
    };
  }
}

/**
 * Format commit message for display (truncate if too long)
 */
export function formatCommitMessage(message: string, maxLength: number = 80): string {
  if (message.length <= maxLength) {
    return message;
  }
  return message.substring(0, maxLength - 3) + "...";
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 24) {
    if (diffInHours < 1) {
      return "Just now";
    }
    return `${diffInHours}h ago`;
  } else if (diffInHours < 24 * 7) {
    const days = Math.floor(diffInHours / 24);
    return `${days}d ago`;
  } else {
    return date.toLocaleDateString();
  }
}

/**
 * Get repository name from GitHub URL
 */
export function getRepoNameFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/").filter(Boolean);
    return pathParts[1] || ""; // repo name is second part of path
  } catch {
    return "";
  }
}
