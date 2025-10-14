"use client";

/**
 * Home Page - Portfolio Marcel
 *
 * This is the main landing page of the portfolio website.
 * It serves as an introduction to Marcel and showcases key information,
 * featured projects, and call-to-action sections.
 *
 * Features:
 * - Hero section with introduction and CTA
 * - Featured projects showcase
 * - Skills and technologies overview
 * - Contact information and social links
 * - Responsive design for all screen sizes
 * - Smooth animations powered by Framer Motion
 *
 * @page
 * @route /
 */

import Link from "next/link";
import { escapeApostrophes } from "@/lib/jsx-utils";
import { motion } from "framer-motion";

/**
 * Featured project interface for type safety
 */
interface FeaturedProject {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

/**
 * Featured projects data
 * These are the main projects to showcase on the homepage
 */
const featuredProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description:
      "Modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features include smooth animations, dark mode support, and optimized performance.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/Cyrochrome/portofolio-marcel",
    liveUrl: "https://portofolio-marcel.vercel.app",
    featured: true,
  },
  {
    id: 2,
    title: "AI Chatbot with Nuxt",
    description:
      "Interactive chatbot application built with Nuxt.js and integrated with Gemini AI. Features natural language processing and modern Vue.js architecture.",
    technologies: ["Nuxt.js", "Vue.js", "Gemini AI", "JavaScript"],
    githubUrl: "https://github.com/Cyrochrome/nuxt-gemini-chatbot",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: 3,
    title: "Learning Management System",
    description:
      "Comprehensive educational platform with course management, student progress tracking, and interactive learning modules built with modern web technologies.",
    technologies: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    githubUrl: "https://github.com/Cyrochrome/bimbel-alfa",
    liveUrl: "https://example.com",
    featured: true,
  },
];

/**
 * Skills and technologies data
 */
const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Nuxt.js",
  "Vue.js",
  "Node.js",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Git",
  "GitHub",
];

/**
 * Home page component
 *
 * @returns {React.JSX.Element} The rendered home page
 */
export default function Home(): React.JSX.Element {
  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="container px-4 py-24 mx-auto text-center lg:px-8 lg:py-32">
        <div className="max-w-3xl mx-auto">
          <motion.h1
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Hi, {escapeApostrophes("I'm")}{" "}
            <motion.span
              className="text-primary"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Marcel
            </motion.span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg leading-8 text-muted-foreground lg:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            A passionate full-stack developer specializing in creating
            exceptional digital experiences. I build modern web applications
            with cutting-edge technologies and user-centered design.
          </motion.p>
          <motion.div
            className="mt-10 flex items-center justify-center gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/projects"
                className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
              >
                View My Work
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/contact"
                className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
              >
                Get In Touch <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
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
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              className="flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex-1 p-6">
                <h3 className="text-xl font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-x-4 border-t bg-muted/50 p-4">
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    View Code →
                  </Link>
                )}
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Live Demo →
                  </Link>
                )}
              </div>
            </motion.article>
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

      {/* Skills Section */}
      <motion.section
        className="bg-muted/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container px-4 py-16 mx-auto lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h2
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Skills & Technologies
            </motion.h2>
            <motion.p
              className="mt-4 text-lg leading-8 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              I work with a diverse range of technologies to bring ideas to
              life.
            </motion.p>
          </div>
          <motion.div
            className="mx-auto mt-12 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="inline-flex items-center rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm ring-1 ring-inset ring-border hover:bg-muted transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
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
            {escapeApostrophes("Let's")} Work Together
          </motion.h2>
          <motion.p
            className="mt-4 text-lg leading-8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {escapeApostrophes("I'm")} always interested in new opportunities
            and exciting projects. Whether you have a specific project in mind
            or just want to chat about technology, {escapeApostrophes("I'd")}{" "}
            love to hear from you.
          </motion.p>
          <motion.div
            className="mt-10 flex items-center justify-center gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/contact"
                className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
              >
                Get In Touch
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/about"
                className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
              >
                Learn More About Me <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}
