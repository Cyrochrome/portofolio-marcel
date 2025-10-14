"use client";

/**
 * Projects Hero Section Component
 *
 * Displays the main heading and description for the projects page.
 * Client component to support Framer Motion animations.
 */

import { motion } from "framer-motion";

/**
 * Projects hero section - Server Component
 *
 * @returns {React.JSX.Element} The rendered hero section
 */
export function ProjectsHeroSection(): React.JSX.Element {
  return (
    <section className="container px-4 py-16 mx-auto lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h1
          className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Projects
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A collection of projects that showcase my skills, creativity, and
          passion for development. Each project represents a unique challenge
          and learning experience.
        </motion.p>
      </div>
    </section>
  );
}
