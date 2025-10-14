"use client";

/**
 * Skills Section Component
 *
 * Displays the skills and technologies section with animated skill badges
 * showcasing the diverse range of technologies used.
 */

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface SkillsSectionProps {
  skills?: string[];
}

const defaultSkills = [
  "Python Flask",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Vue.js",
  "Node.js",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "API Integration",
  "Multi-tenant Systems",
  "Ecommerce",
  "Landing Pages",
  "n8n Automation",
  "Git",
  "GitHub",
];

export function SkillsSection({ skills = defaultSkills }: SkillsSectionProps) {
  return (
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
            I work with a diverse range of technologies to bring ideas to life.
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
              <motion.div
                key={skill}
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
                <Badge variant="secondary" className="text-sm px-4 py-2 h-auto">
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
