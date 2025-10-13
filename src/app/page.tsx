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
 *
 * @page
 * @route /
 */

import Link from "next/link";
import { escapeApostrophes } from "@/lib/jsx-utils";

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
    title: "E-commerce Platform",
    description:
      "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, inventory management, and admin dashboard.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    technologies: ["Next.js", "TypeScript", "Prisma", "Socket.io", "Chakra UI"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "Interactive weather dashboard with location-based forecasts, weather maps, and historical data visualization.",
    technologies: ["Vue.js", "D3.js", "OpenWeather API", "Chart.js"],
    githubUrl: "https://github.com",
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
  "Node.js",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Git",
  "Tailwind CSS",
];

/**
 * Home page component
 *
 * @returns {React.JSX.Element} The rendered home page
 */
export default function Home(): React.JSX.Element {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container px-4 py-24 mx-auto text-center lg:px-8 lg:py-32">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Hi, {escapeApostrophes("I'm")}{" "}
            <span className="text-primary">Marcel</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground lg:text-xl">
            A passionate full-stack developer specializing in creating
            exceptional digital experiences. I build modern web applications
            with cutting-edge technologies and user-centered design.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/projects"
              className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
            >
              Get In Touch <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="container px-4 py-16 mx-auto lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Here are some of my recent projects that showcase my skills and
            passion for development.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
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
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="text-sm font-semibold leading-6 text-primary hover:text-primary/80 transition-colors"
          >
            View All Projects <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Skills Section */}
      <section className="bg-muted/50">
        <div className="container px-4 py-16 mx-auto lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Skills & Technologies
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              I work with a diverse range of technologies to bring ideas to
              life.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm ring-1 ring-inset ring-border hover:bg-muted transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-16 mx-auto lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {escapeApostrophes("Let's")} Work Together
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            {escapeApostrophes("I'm")} always interested in new opportunities
            and exciting projects. Whether you have a specific project in mind
            or just want to chat about technology, {escapeApostrophes("I'd")}{" "}
            love to hear from you.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/contact"
              className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
            >
              Get In Touch
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
            >
              Learn More About Me <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
