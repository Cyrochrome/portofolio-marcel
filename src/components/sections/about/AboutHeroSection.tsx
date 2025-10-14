"use client";

/**
 * About Hero Section Component
 *
 * Displays the main hero section for the about page with Marcel's personal story
 * and journey into software development.
 */

import { motion } from "framer-motion";
import { escapeApostrophes } from "@/lib/jsx-utils";

export function AboutHeroSection() {
  return (
    <section className="container px-4 py-24 mx-auto text-center lg:px-8 lg:py-32">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          My Journey as a{" "}
          <motion.span
            className="text-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Self-Taught Developer
          </motion.span>
        </motion.h1>
        <motion.div
          className="mt-8 space-y-6 text-lg leading-8 text-muted-foreground lg:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <p>
            My path into software development wasn{escapeApostrophes("n't")}{" "}
            conventional. After completing high school in mid-2022, I faced the
            uncertainty of failing university entrance exams and months of
            unemployment.
          </p>
          <p>
            Everything changed when my uncle, a senior fullstack developer, took
            me under his wing at his small private development team. What
            started as a 3-month internship with full salary became over a year
            of professional development, building substantial experience across
            diverse projects.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
