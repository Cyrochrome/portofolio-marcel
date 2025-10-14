/**
 * About Page - Portfolio Marcel
 *
 * Server Component that composes all about page sections to tell Marcel's story.
 * Uses route groups for better organization without affecting URL structure.
 *
 * Features:
 * - Personal story and journey as a self-taught developer
 * - Career timeline with key milestones and projects
 * - Technical expertise gained from real-world experience
 * - Personal values and philosophy shaped by diverse experiences
 * - Call-to-action for potential opportunities
 *
 * @page
 * @route /about
 */

import {
  AboutHeroSection,
  CareerTimelineSection,
  TechnicalExpertiseSection,
  ValuesPhilosophySection,
} from "@/components/sections/about";

/**
 * About page component - Server Component (no "use client")
 *
 * @returns {React.JSX.Element} The rendered about page
 */
export default function About(): React.JSX.Element {
  return (
    <div className="flex flex-col">
      {/* About Hero Section */}
      <AboutHeroSection />

      {/* Career Timeline Section */}
      <CareerTimelineSection />

      {/* Technical Expertise Section */}
      <TechnicalExpertiseSection />

      {/* Values & Philosophy Section */}
      <ValuesPhilosophySection />
    </div>
  );
}
