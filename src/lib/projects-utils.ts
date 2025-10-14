/**
 * Projects Utilities for Portfolio
 *
 * Handles fetching and processing project data for the portfolio showcase.
 * Supports both static configuration and dynamic GitHub integration.
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
 * Fetch featured projects configuration
 */
export async function getFeaturedProjects(): Promise<ProjectConfig[]> {
  // Return static projects configuration directly
  // This avoids circular dependency issues when called from API routes
  return STATIC_PROJECTS;
}

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
  return STATIC_PROJECTS.find(project => project.id === id);
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
