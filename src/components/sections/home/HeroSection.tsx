"use client";

/**
 * Hero Section Component
 *
 * Displays the main hero/intro section with animated introduction,
 * call-to-action buttons, and Marcel's presentation.
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { escapeApostrophes } from "@/lib/jsx-utils";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics-utils";

export function HeroSection() {
  return (
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
          A self-taught full-stack developer with real-world experience across
          diverse industries. From building gambling platforms with complex
          backend systems to creating ecommerce solutions, I turn challenging
          problems into elegant digital solutions.
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
            <Button asChild size="lg">
              <Link
                href="/projects"
                onClick={() =>
                  trackEvent({
                    name: "cta_button_clicked",
                    properties: {
                      button_text: "View My Work",
                      button_location: "hero_section",
                    },
                  })
                }
              >
                View My Work
              </Link>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Button variant="ghost" asChild>
              <Link
                href="/contact"
                onClick={() =>
                  trackEvent({
                    name: "cta_button_clicked",
                    properties: {
                      button_text: "Get In Touch",
                      button_location: "hero_section",
                    },
                  })
                }
              >
                Get In Touch <span aria-hidden="true">→</span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
