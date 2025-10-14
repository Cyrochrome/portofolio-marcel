"use client";

/**
 * Values and Philosophy Section Component
 *
 * Showcases Marcel's personal values, work philosophy, and lessons learned
 * from his diverse career experiences.
 */

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faLightbulb,
  faArrowsRotate,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent } from "@/components/ui/card";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface Value {
  title: string;
  description: string;
  icon: IconDefinition;
}

const values: Value[] = [
  {
    title: "Self-Taught Resilience",
    description:
      "I believe in learning through doing and real projects rather than formal education. Every challenge is an opportunity to grow, and every setback is a lesson in disguise.",
    icon: faRocket,
  },
  {
    title: "Practical Problem Solving",
    description:
      "Real-world experience has taught me that the best solutions come from understanding the actual problem, not just applying textbook theories. I focus on delivering functional, maintainable code.",
    icon: faLightbulb,
  },
  {
    title: "Adaptability & Growth",
    description:
      "Technology evolves rapidly, and so do I. From gambling platforms to ecommerce solutions, I've learned to quickly adapt to new industries, tools, and challenges.",
    icon: faArrowsRotate,
  },
  {
    title: "Mentorship & Knowledge Sharing",
    description:
      "My uncle's guidance changed my life, and I believe in paying it forward. I'm committed to helping other self-taught developers navigate their own journeys.",
    icon: faHandshake,
  },
];

const lessons: string[] = [
  "Clear communication and contracts prevent misunderstandings",
  "Every industry has unique challenges that shape your perspective",
  "Continuous learning is not optional in tech",
  "Family and community support are invaluable",
  "Real-world experience often trumps formal credentials",
  "Payment terms should always be established upfront",
];

export function ValuesPhilosophySection() {
  return (
    <motion.section
      className="bg-muted/50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container px-4 py-16 mx-auto lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Values & Philosophy
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            My approach to development is shaped by real experiences, challenges
            overcome, and lessons learned from diverse industries and roles.
          </motion.p>

          {/* Core Values */}
          <div className="grid gap-8 md:grid-cols-2 mb-16">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl text-primary">
                        <FontAwesomeIcon icon={value.icon} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {value.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Lessons Learned */}
          <Card>
            <CardContent className="p-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
                  Key Lessons from My Journey
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {lessons.map((lesson, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-muted-foreground">{lesson}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  );
}
