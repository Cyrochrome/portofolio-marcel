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
import { githubApiRequest, createUserEndpoint, createRepoEndpoint } from "./axios-config";

/**
 * GitHub API Error interface
 */
interface GitHubApiError extends Error {
  status?: number;
}

/**
 * Fetch user repositories from GitHub API
 */
export async function fetchUserRepositories(): Promise<GitHubRepository[]> {
  try {
    const repositories: GitHubRepository[] = await githubApiRequest(
      createUserEndpoint("/repos"),
      {
        params: { sort: "updated", per_page: 100 },
      }
    );

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
    const repository: GitHubRepository = await githubApiRequest(createRepoEndpoint(repoName));
    return repository;
  } catch (error) {
    const apiError = error as GitHubApiError;
    if (apiError.status === 404) {
      // Repository not found - return null instead of throwing
      return null;
    }
    console.error(`Error fetching repository ${repoName}:`, error);
    return null;
  }
}

/**
 * Fetch languages used in a repository
 */
export async function fetchRepositoryLanguages(repoName: string): Promise<GitHubLanguage> {
  try {
    const languages: GitHubLanguage = await githubApiRequest(createRepoEndpoint(repoName, "/languages"));
    return languages;
  } catch (error) {
    const apiError = error as GitHubApiError;
    if (apiError.status === 404) {
      // Repository not found - return empty object instead of throwing
      return {};
    }
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
    const commits: GitHubCommit[] = await githubApiRequest(createRepoEndpoint(repoName, `/commits`), {
      params: { per_page: limit },
    });
    return commits.slice(0, limit);
  } catch (error) {
    const apiError = error as GitHubApiError;
    if (apiError.status === 404) {
      // Repository not found - return empty array instead of throwing
      return [];
    }
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
