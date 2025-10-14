/**
 * Projects Utilities for Portfolio
 *
 * Handles fetching and processing project data for the portfolio showcase.
 * Supports both static configuration and dynamic GitHub integration.
 */

import { GitHubRepository } from "@/types/github";
import { fetchUserRepositories } from "./github-utils";

export interface ProjectConfig {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  priority?: number; // For sorting featured projects
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
    title: "Learning Management System",
    description:
      "Comprehensive educational platform with course management, student progress tracking, and interactive learning modules built with modern web technologies.",
    technologies: ["TypeScript", "React", "Node.js", "PostgreSQL"],
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
  try {
    // Try to fetch from API first (for dynamic configuration)
    const response = await fetch("/api/projects", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.data.length > 0) {
        return data.data;
      }
    }
  } catch (error) {
    console.warn("Failed to fetch dynamic projects, using static configuration:", error);
  }

  // Fallback to static configuration
  return STATIC_PROJECTS;
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
