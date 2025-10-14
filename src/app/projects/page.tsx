/**
 * Projects Page - Portfolio Marcel
 *
 * Server Component that composes all projects page sections.
 * Uses route groups for better organization without affecting URL structure.
 *
 * Features:
 * - Hero section with projects overview
 * - Advanced filtering and search capabilities
 * - Project showcase with dynamic GitHub data integration
 * - Responsive grid layout with sorting options
 *
 * @page
 * @route /projects
 */

import { ProjectsHeroSection } from "@/components/sections/projects";
import { ProjectsPageClient } from "@/components/sections/projects/ProjectsPageClient";

/**
 * Projects page component - Server Component (no "use client")
 *
 * @returns {React.JSX.Element} The rendered projects page
 */
export default function Projects(): React.JSX.Element {
  return (
    <div className="flex flex-col">
      {/* Projects Hero Section */}
      <ProjectsHeroSection />

      {/* Projects Page Client (handles all interactive features) */}
      <ProjectsPageClient />
    </div>
  );
}
