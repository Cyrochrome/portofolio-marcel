"use client";

/**
 * Call To Action Section Component
 *
 * Displays the final CTA section encouraging visitors to get in touch
 * or learn more about Marcel.
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { escapeApostrophes } from "@/lib/jsx-utils";

export function CallToActionSection() {
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
          {escapeApostrophes("Let's")} Work Together
        </motion.h2>
        <motion.p
          className="mt-4 text-lg leading-8 text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {escapeApostrophes("I'm")} always interested in new opportunities and
          exciting projects. Whether you have a specific project in mind or just
          want to chat about technology, {escapeApostrophes("I'd")} love to hear
          from you.
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
  );
}
