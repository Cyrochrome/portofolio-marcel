"use client";

/**
 * Contact Hero Section Component
 *
 * Displays the main hero section for the contact page with introduction
 * and call-to-action for getting in touch.
 */

import { motion } from "framer-motion";
import { escapeApostrophes } from "@/lib/jsx-utils";

export function ContactHeroSection() {
  return (
    <section className="container px-4 py-24 mx-auto text-center lg:px-8 lg:py-32">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Get In{" "}
          <motion.span
            className="text-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Touch
          </motion.span>
        </motion.h1>
        <motion.p
          className="mt-6 text-lg leading-8 text-muted-foreground lg:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          {escapeApostrophes("I'm")} always interested in new opportunities and
          exciting projects. Whether you have a specific project in mind or just
          want to connect, {escapeApostrophes("I'd")} love to hear from you.
        </motion.p>
      </div>
    </section>
  );
}
