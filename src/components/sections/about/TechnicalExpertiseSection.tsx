"use client";

/**
 * Technical Expertise Section Component
 *
 * Showcases Marcel's technical skills gained from real-world projects
 * and professional experience across different industries.
 */

import { motion } from "framer-motion";

interface ExpertiseArea {
  title: string;
  description: string;
  technologies: string[];
  projects: string[];
}

const expertiseAreas: ExpertiseArea[] = [
  {
    title: "Backend Development",
    description:
      "Strong foundation in server-side development with experience in complex system architecture and API integrations.",
    technologies: [
      "Python Flask",
      "REST APIs",
      "Multi-vendor Integration",
      "Database Design",
    ],
    projects: [
      "Gambling Platform (Multi-tenant)",
      "Reporting Systems",
      "API Gateway",
    ],
  },
  {
    title: "Frontend Development",
    description:
      "Creating responsive and user-friendly interfaces across different platforms and devices.",
    technologies: ["JavaScript", "React", "Next.js", "Responsive Design"],
    projects: ["Linktree Imitation", "Adult Content Platform", "Landing Pages"],
  },
  {
    title: "Ecommerce Solutions",
    description:
      "Specialized in building and maintaining online stores, payment systems, and customer management platforms.",
    technologies: [
      "Ecommerce Platforms",
      "Payment Integration",
      "Inventory Management",
      "n8n Automation",
    ],
    projects: [
      "Lamonte Mode International",
      "B2B Kids Clothing Platform",
      "Automated Campaigns",
    ],
  },
  {
    title: "Full-Stack Integration",
    description:
      "Connecting frontend interfaces with complex backend systems and third-party services.",
    technologies: [
      "API Development",
      "System Integration",
      "Real-time Updates",
      "Error Handling",
    ],
    projects: [
      "Multi-tenant Gambling Site",
      "Vendor API Integration",
      "Automated Workflows",
    ],
  },
];

export function TechnicalExpertiseSection() {
  return (
    <motion.section
      className="py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container px-4 mx-auto lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Technical Expertise
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Real-world skills honed through diverse projects and challenging
            technical requirements
          </motion.p>

          <div className="grid gap-8 md:grid-cols-2">
            {expertiseAreas.map((area, index) => (
              <motion.div
                key={index}
                className="bg-muted/50 p-6 rounded-lg border"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {area.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {area.description}
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {area.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">
                      Key Projects
                    </h4>
                    <ul className="space-y-1">
                      {area.projects.map((project, projectIndex) => (
                        <li
                          key={projectIndex}
                          className="text-sm text-muted-foreground flex items-center"
                        >
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
