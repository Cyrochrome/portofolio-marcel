"use client";

/**
 * Projects Grid Section Component
 *
 * Displays the filtered and sorted projects in a responsive grid layout.
 * Client component for handling dynamic project data and GitHub integration.
 */

import { motion } from "framer-motion";
import { ProjectConfig } from "@/lib/projects-utils";
import { EnhancedProjectCard } from "@/components/github/EnhancedProjectCard";

interface ProjectsGridSectionProps {
  filteredProjects: ProjectConfig[];
  viewMode: "grid" | "list";
}

/**
 * Projects grid section - Client Component
 *
 * @param {ProjectsGridSectionProps} props - Component props
 * @returns {React.JSX.Element} The rendered grid section
 */
export function ProjectsGridSection({
  filteredProjects,
  viewMode,
}: ProjectsGridSectionProps): React.JSX.Element {
  if (filteredProjects.length === 0) {
    return (
      <section className="container px-4 py-16 mx-auto lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="rounded-lg bg-muted/50 p-8 max-w-md mx-auto">
              <p className="text-muted-foreground mb-2">No projects found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="container px-4 py-16 mx-auto lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className={`grid gap-8 ${
            viewMode === "grid"
              ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
              : "grid-cols-1"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {filteredProjects.map((project, index) => (
            <EnhancedProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
