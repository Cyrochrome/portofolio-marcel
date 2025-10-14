"use client";

/**
 * Career Timeline Section Component
 *
 * Displays Marcel's career journey in an interactive timeline format,
 * showcasing the progression from high school to professional developer.
 */

import { motion } from "framer-motion";

interface TimelineItem {
  year: string;
  title: string;
  company?: string;
  description: string;
  skills?: string[];
}

const timelineData: TimelineItem[] = [
  {
    year: "Mid 2022",
    title: "High School Graduate",
    description:
      "Completed high school and faced university entrance exam challenges, leading to a period of unemployment and self-reflection.",
  },
  {
    year: "Oct 2022 - Feb 2024",
    title: "Professional Development Journey",
    description:
      "Uncle (senior fullstack developer) brings me into his small private team. Started with 3-month internship/probation with full salary (4.5M IDR/month), continued working for over a year building substantial experience across multiple projects.",
  },
  {
    year: "2022-2023",
    title: "Key Projects & Skill Development",
    description:
      "During my time at the development team, I worked on diverse projects that built my technical foundation: Linktree imitation, adult content platform, and most significantly, a gambling site with complex backend systems.",
    skills: [
      "Python Flask",
      "API Integration",
      "Multi-tenant Systems",
      "Frontend Development",
    ],
  },
  {
    year: "Feb 2024",
    title: "Values-Driven Decision",
    description:
      "Made the principled choice to leave the development team due to moral concerns about working on ethically questionable 'black projects' including gambling platforms, despite the attractive salary (4.5M IDR/month).",
  },
  {
    year: "Apr 2025",
    title: "Education Sector Project",
    description:
      "Built website for a small Bimbel (education center). Project completed but ended due to payment disagreements.",
    skills: ["Web Development", "Client Relations", "Project Management"],
  },
  {
    year: "Aug 2025",
    title: "Operations Management",
    description:
      "Worked as outlet operator at Kebab Turki Baba Rafi, gaining valuable customer service and operational management experience.",
  },
  {
    year: "Mid-July 2025",
    title: "B2B Ecommerce Role",
    description:
      "Joined Lamonte Mode International, maintaining ecommerce platforms, creating landing pages, and using n8n for automation.",
    skills: [
      "Ecommerce",
      "Landing Pages",
      "n8n Automation",
      "Platform Maintenance",
    ],
  },
];

export function CareerTimelineSection() {
  return (
    <motion.section
      className="bg-muted/50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container px-4 py-16 mx-auto lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Career Journey
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 md:-translate-x-0.5" />

            <div className="space-y-8">
              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background md:-translate-x-2 z-10" />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                    }`}
                  >
                    <div className="bg-background p-6 rounded-lg shadow-sm border">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-primary font-semibold">
                          {item.year}
                        </span>
                        {item.company && (
                          <span className="text-sm text-muted-foreground">
                            • {item.company}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {item.description}
                      </p>
                      {item.skills && (
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
