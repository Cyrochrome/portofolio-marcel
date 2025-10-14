"use client";

/**
 * Featured Projects Component
 *
 * Displays the portfolio's featured projects with dynamic GitHub integration.
 * Handles fetching project data and rendering enhanced project cards.
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ProjectConfig, getFeaturedProjects } from "@/lib/projects-utils";
import { EnhancedProjectCard } from "./github/EnhancedProjectCard";

export function FeaturedProjects() {
  const [projects, setProjects] = useState<ProjectConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const projectsData = await getFeaturedProjects();
        setProjects(projectsData);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load projects"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="container px-4 py-16 mx-auto lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="h-8 bg-muted-foreground/20 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-muted-foreground/20 rounded w-96 mx-auto"></div>
        </div>
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="rounded-lg border bg-card p-6">
                <div className="h-6 bg-muted-foreground/20 rounded w-3/4 mb-3"></div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-muted-foreground/20 rounded"></div>
                  <div className="h-4 bg-muted-foreground/20 rounded w-5/6"></div>
                </div>
                <div className="flex gap-2 mb-4">
                  {[...Array(3)].map((_, j) => (
                    <div
                      key={j}
                      className="h-6 bg-primary/10 rounded w-20"
                    ></div>
                  ))}
                </div>
                <div className="h-8 bg-muted-foreground/20 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error || projects.length === 0) {
    return (
      <section className="container px-4 py-16 mx-auto lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Featured Projects
          </motion.h2>
          <div className="rounded-lg bg-destructive/10 p-6 text-destructive">
            <p>Unable to load projects</p>
            {error && <p className="text-sm mt-2 opacity-80">{error}</p>}
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className="container px-4 py-16 mx-auto lg:px-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-2xl text-center">
        <motion.h2
          className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Featured Projects
        </motion.h2>
        <motion.p
          className="mt-4 text-lg leading-8 text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Here are some of my recent projects that showcase my skills and
          passion for development.
        </motion.p>
      </div>
      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
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
      </div>
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Link
          href="/projects"
          className="text-sm font-semibold leading-6 text-primary hover:text-primary/80 transition-colors"
        >
          View All Projects <span aria-hidden="true">→</span>
        </Link>
      </motion.div>
    </motion.section>
  );
}
