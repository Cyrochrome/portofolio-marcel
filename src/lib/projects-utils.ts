/**
 * Projects Utilities for Portfolio
 *
 * Handles fetching and processing project data for the portfolio showcase.
 * Supports dynamic GitHub integration with flexible filtering and context7 enhancement.
 */

import { GitHubRepoStats, GitHubRepository } from "@/types/github";

export interface ProjectConfig {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  priority?: number; // For sorting featured projects
  githubData?: GitHubRepoStats;
}

export interface ProjectFilters {
  minStars?: number;
  minForks?: number;
  maxAge?: number; // days since last update
  requiredTopics?: string[];
  excludeTopics?: string[];
  excludeForks?: boolean;
  excludeArchived?: boolean;
  limit?: number;
  sortBy?: 'stars' | 'updated' | 'created' | 'name';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Static project configuration as fallback
 */
export const STATIC_PROJECTS: ProjectConfig[] = [
  {
    id: "portfolio-marcel",
    title: "Portfolio Website",
    description:
      "Modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features include smooth animations, dark mode support, and optimized performance.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/Cyrochrome/portofolio-marcel",
    liveUrl: "https://portofolio-marcel.vercel.app",
    featured: true,
    priority: 1,
  },
  {
    id: "nuxt-gemini-chatbot",
    title: "AI Chatbot with Nuxt",
    description:
      "Interactive chatbot application built with Nuxt.js and integrated with Gemini AI. Features natural language processing and modern Vue.js architecture.",
    technologies: ["Nuxt.js", "Vue.js", "Gemini AI", "JavaScript"],
    githubUrl: "https://github.com/Cyrochrome/nuxt-gemini-chatbot",
    liveUrl: "https://example.com",
    featured: true,
    priority: 2,
  },
  {
    id: "bimbel-alfa",
    title: "Bimbel Landing Page",
    description:
      "Modern landing page for Bimbel Alfa, a tutoring and educational services platform. Features responsive design, engaging content sections, and conversion-optimized layout.",
    technologies: ["TypeScript", "React", "Node.js", "Tailwind CSS"],
    githubUrl: "https://github.com/Cyrochrome/bimbel-alfa",
    liveUrl: "https://example.com",
    featured: true,
    priority: 3,
  },
];



/**
 * Enhanced project loader that combines static projects with real GitHub data
 */
export async function getEnhancedProjects(): Promise<ProjectConfig[]> {
  try {
    // Import here to avoid circular dependencies
    const { fetchUserRepositories, getRepositoryStats } = await import('./github-utils');

    // Get static projects as base
    const projects = [...STATIC_PROJECTS];

    // Get real GitHub repositories
    const githubRepos = await fetchUserRepositories();

    if (githubRepos.length === 0) {
      console.warn('No GitHub repositories found, using static projects only');
      return projects;
    }

    // Create a map of GitHub repos by name for quick lookup
    const githubRepoMap = new Map<string, GitHubRepository>();
    githubRepos.forEach(repo => {
      githubRepoMap.set(repo.name.toLowerCase(), repo);
    });

    // Enhance static projects with GitHub data when available
    const enhancedProjects = await Promise.all(
      projects.map(async (project) => {
        const repoName = project.githubUrl ? getRepoNameFromProject(project) : null;

        if (repoName) {
          const githubRepo = githubRepoMap.get(repoName.toLowerCase());

          if (githubRepo) {
            try {
              // Get detailed GitHub stats for this repository
              const githubStats = await getRepositoryStats(repoName);

              if (githubStats) {
                return {
                  ...project,
                  githubData: githubStats,
                };
              }
            } catch (error) {
              console.warn(`Failed to get GitHub stats for ${repoName}:`, error);
            }
          }
        }

        // Return original project if no GitHub enhancement available
        return project;
      })
    );

    console.log(`Enhanced ${enhancedProjects.length} projects with GitHub data`);
    return enhancedProjects;

  } catch (error) {
    console.error('Error enhancing projects with GitHub data:', error);
    // Fall back to static projects
    return STATIC_PROJECTS;
  }
}

/**
 * Get project configuration by ID
 */
export function getProjectById(id: string): ProjectConfig | undefined {
  // First check static projects for backward compatibility
  const staticProject = STATIC_PROJECTS.find(project => project.id === id);
  if (staticProject) return staticProject;

  // For dynamic projects, we'll need to fetch and search
  // This is a simplified version - in a real implementation you might want to cache this
  return undefined;
}

/**
 * Get repository name from GitHub URL for API calls
 */
export function getRepoNameFromProject(project: ProjectConfig): string | null {
  if (!project.githubUrl) return null;

  try {
    const url = new URL(project.githubUrl);
    const pathParts = url.pathname.split("/").filter(Boolean);
    return pathParts[1] || null; // repo name is second part of path
  } catch {
    return null;
  }
}

/**
 * Filter and sort projects for display
 */
export function processProjectsForDisplay(projects: ProjectConfig[]): ProjectConfig[] {
  return projects
    .filter(project => project.featured)
    .sort((a, b) => (a.priority || 999) - (b.priority || 999));
}

/**
 * Apply filters to GitHub repositories
 */
export function applyProjectFilters(
  repositories: GitHubRepository[],
  filters: ProjectFilters
): GitHubRepository[] {
  let filtered = [...repositories];

  // Exclude archived repositories
  if (filters.excludeArchived !== false) {
    filtered = filtered.filter(repo => !repo.archived);
  }

  // Exclude forks if specified
  if (filters.excludeForks) {
    filtered = filtered.filter(repo => !repo.fork);
  }

  // Filter by minimum stars
  if (filters.minStars) {
    filtered = filtered.filter(repo => repo.stargazers_count >= filters.minStars!);
  }

  // Filter by minimum forks
  if (filters.minForks) {
    filtered = filtered.filter(repo => repo.forks_count >= filters.minForks!);
  }

  // Filter by maximum age (days since last update)
  if (filters.maxAge) {
    const maxAgeDate = new Date();
    maxAgeDate.setDate(maxAgeDate.getDate() - filters.maxAge);
    filtered = filtered.filter(repo => new Date(repo.updated_at) >= maxAgeDate);
  }

  // Filter by required topics
  if (filters.requiredTopics && filters.requiredTopics.length > 0) {
    filtered = filtered.filter(repo =>
      filters.requiredTopics!.some(topic =>
        repo.topics.some(repoTopic =>
          repoTopic.toLowerCase().includes(topic.toLowerCase())
        )
      )
    );
  }

  // Exclude specific topics
  if (filters.excludeTopics && filters.excludeTopics.length > 0) {
    filtered = filtered.filter(repo =>
      !filters.excludeTopics!.some(topic =>
        repo.topics.some(repoTopic =>
          repoTopic.toLowerCase().includes(topic.toLowerCase())
        )
      )
    );
  }

  // Sort repositories
  const sortBy = filters.sortBy || 'updated';
  const sortOrder = filters.sortOrder || 'desc';

  filtered.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'stars':
        comparison = a.stargazers_count - b.stargazers_count;
        break;
      case 'updated':
        comparison = new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
        break;
      case 'created':
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      default:
        comparison = 0;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Apply limit
  if (filters.limit) {
    filtered = filtered.slice(0, filters.limit);
  }

  return filtered;
}

/**
 * Convert GitHub repository to ProjectConfig format
 */
export function convertGitHubRepoToProject(repo: GitHubRepository): ProjectConfig {
  // Extract technologies from topics and language
  const technologies: string[] = [];

  // Add primary language if available
  if (repo.language) {
    technologies.push(repo.language);
  }

  // Add relevant topics as technologies (filter out non-tech topics)
  const techTopics = repo.topics.filter(topic =>
    !['portfolio', 'personal', 'learning', 'practice', 'example'].includes(topic.toLowerCase())
  ).slice(0, 4); // Limit to 4 technologies

  technologies.push(...techTopics);

  // Generate description from repo description or use default
  const description = repo.description ||
    `${repo.name} - A ${repo.language || 'software'} project showcasing development skills and techniques.`;

  return {
    id: repo.name,
    title: repo.name,
    description,
    technologies,
    githubUrl: repo.html_url,
    featured: repo.stargazers_count > 0 || repo.topics.includes('featured'),
    priority: repo.stargazers_count * 10 + (repo.forks_count * 5), // Calculate priority based on engagement
  };
}

/**
 * Get dynamic projects from GitHub with filtering
 */
export async function getDynamicProjects(filters?: ProjectFilters): Promise<ProjectConfig[]> {
  try {
    // Import here to avoid circular dependencies
    const { fetchUserRepositories } = await import('./github-utils');

    // Get all GitHub repositories
    const githubRepos = await fetchUserRepositories();

    if (githubRepos.length === 0) {
      console.warn('No GitHub repositories found');
      return [];
    }

    // Apply filters if provided, otherwise use default featured filter
    const defaultFilters: ProjectFilters = {
      excludeArchived: true,
      excludeForks: false,
      minStars: 0,
      sortBy: 'updated',
      sortOrder: 'desc',
      limit: 10,
      ...filters,
    };

    const filteredRepos = applyProjectFilters(githubRepos, defaultFilters);

    // Convert to ProjectConfig format
    const projects = filteredRepos.map(convertGitHubRepoToProject);

    console.log(`Fetched ${projects.length} dynamic projects from GitHub`);
    return projects;

  } catch (error) {
    console.error('Error fetching dynamic projects:', error);
    return [];
  }
}

/**
 * Get featured projects with dynamic GitHub integration
 */
export async function getFeaturedProjects(): Promise<ProjectConfig[]> {
  try {
    // Try to get dynamic projects first
    const dynamicProjects = await getDynamicProjects({
      minStars: 1,
      excludeForks: false,
      sortBy: 'stars',
      sortOrder: 'desc',
      limit: 6,
    });

    if (dynamicProjects.length > 0) {
      // Mark top projects as featured
      return dynamicProjects.map((project, index) => ({
        ...project,
        featured: true,
        priority: (dynamicProjects.length - index) * 10, // Higher priority for top projects
      }));
    }

    // Fallback to static projects if no dynamic projects available
    console.warn('No dynamic projects found, falling back to static projects');
    return STATIC_PROJECTS;

  } catch (error) {
    console.error('Error getting featured projects:', error);
    return STATIC_PROJECTS;
  }
}

/**
 * Get recent projects based on update activity
 */
export async function getRecentProjects(limit: number = 6): Promise<ProjectConfig[]> {
  try {
    const dynamicProjects = await getDynamicProjects({
      maxAge: 90, // Projects updated in last 90 days
      sortBy: 'updated',
      sortOrder: 'desc',
      limit,
    });

    return dynamicProjects;

  } catch (error) {
    console.error('Error getting recent projects:', error);
    return [];
  }
}

/**
 * Get all projects with comprehensive data
 */
export async function getAllProjects(): Promise<ProjectConfig[]> {
  try {
    const dynamicProjects = await getDynamicProjects({
      excludeArchived: true,
      sortBy: 'updated',
      sortOrder: 'desc',
    });

    return dynamicProjects;

  } catch (error) {
    console.error('Error getting all projects:', error);
    return [];
  }
}
