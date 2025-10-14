/**
 * Home Page - Portfolio Marcel
 *
 * Server Component that composes all home page sections.
 * Uses route groups for better organization without affecting URL structure.
 *
 * Features:
 * - Hero section with introduction and CTA
 * - Featured projects showcase with dynamic GitHub data
 * - Skills and technologies overview
 * - GitHub statistics and recent activity
 * - Contact information and social links
 *
 * @page
 * @route /
 */

import { FeaturedProjects } from "@/components/FeaturedProjects";
import { GitHubStats } from "@/components/github/GitHubStats";
import { RecentCommits } from "@/components/github/RecentCommits";
import {
  HeroSection,
  SkillsSection,
  CallToActionSection,
} from "@/components/sections/home";

/**
 * Home page component - Server Component (no "use client")
 *
 * @returns {React.JSX.Element} The rendered home page
 */
export default function Home(): React.JSX.Element {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Projects Section */}
      <FeaturedProjects />

      {/* Skills Section */}
      <SkillsSection />

      {/* GitHub Stats Section */}
      <GitHubStats />

      {/* Recent Commits Section */}
      <RecentCommits />

      {/* Call to Action Section */}
      <CallToActionSection />
    </div>
  );
}
