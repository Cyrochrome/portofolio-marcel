"use client";

/**
 * Projects Page Client Component
 *
 * Client component that manages all state for the projects page.
 * Handles data fetching, filtering, and coordination between sections.
 */

import { useEffect, useState } from "react";
import { ProjectConfig } from "@/lib/projects-utils";
import { ProjectsFilterSection } from "./ProjectsFilterSection";
import { ProjectsGridSection } from "./ProjectsGridSection";

type ViewMode = "grid" | "list";

/**
 * Projects page client component - Handles all client-side logic
 *
 * @returns {React.JSX.Element} The rendered projects page content
 */
export function ProjectsPageClient(): React.JSX.Element {
  const [projects, setProjects] = useState<ProjectConfig[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectConfig[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Fetch projects data
  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects");

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();

        if (data.success) {
          setProjects(data.data);
          setFilteredProjects(data.data);
        } else {
          throw new Error(data.error || "Unknown error");
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load projects"
        );
      }
    }

    fetchProjects();
  }, []);

  // Handle filtered projects changes from filter section
  const handleFilteredProjectsChange = (
    newFilteredProjects: ProjectConfig[]
  ) => {
    setFilteredProjects(newFilteredProjects);
  };

  // Handle view mode changes from filter section
  const handleViewModeChange = (newViewMode: ViewMode) => {
    setViewMode(newViewMode);
  };

  if (error) {
    return (
      <div className="flex flex-col">
        <section className="container px-4 py-16 mx-auto lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
              Projects
            </h1>
            <div className="rounded-lg bg-destructive/10 p-8 text-destructive">
              <p className="text-lg mb-2">Unable to load projects</p>
              <p className="text-sm opacity-80">{error}</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Projects Filter Section */}
      <ProjectsFilterSection
        projects={projects}
        onFilteredProjectsChange={handleFilteredProjectsChange}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />

      {/* Projects Grid Section */}
      <ProjectsGridSection
        filteredProjects={filteredProjects}
        viewMode={viewMode}
      />
    </div>
  );
}
