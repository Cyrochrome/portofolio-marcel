"use client";

/**
 * GitHub Statistics Component
 *
 * Displays overall GitHub statistics including repository count,
 * total stars, forks, and language distribution.
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitHubStats as GitHubStatsType } from "@/types/github";

interface GitHubStatsProps {
  className?: string;
}

export function GitHubStats({ className = "" }: GitHubStatsProps) {
  const [stats, setStats] = useState<GitHubStatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const response = await fetch("/api/github/stats");

        if (!response.ok) {
          throw new Error("Failed to fetch GitHub stats");
        }

        const data = await response.json();

        if (data.success) {
          setStats(data.data);
        } else {
          throw new Error(data.error || "Unknown error");
        }
      } catch (err) {
        console.error("Error fetching GitHub stats:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load GitHub stats"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className={`container px-4 py-16 mx-auto lg:px-8 ${className}`}>
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="rounded-lg bg-muted p-6 text-center">
                  <div className="h-8 w-16 bg-muted-foreground/20 mx-auto mb-2 rounded"></div>
                  <div className="h-4 w-20 bg-muted-foreground/20 mx-auto rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !stats) {
    return (
      <section className={`container px-4 py-16 mx-auto lg:px-8 ${className}`}>
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-lg bg-destructive/10 p-6 text-destructive">
            <p>Unable to load GitHub statistics</p>
            {error && <p className="text-sm mt-2 opacity-80">{error}</p>}
          </div>
        </div>
      </section>
    );
  }

  const statItems = [
    {
      label: "Repositories",
      value: stats.totalRepositories,
      icon: "📁",
    },
    {
      label: "Total Stars",
      value: stats.totalStars,
      icon: "⭐",
    },
    {
      label: "Total Forks",
      value: stats.totalForks,
      icon: "🍴",
    },
    {
      label: "Languages",
      value: stats.mostUsedLanguages.length,
      icon: "💻",
    },
  ];

  return (
    <motion.section
      className={`container px-4 py-16 mx-auto lg:px-8 ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            GitHub Activity
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Real-time statistics from my development journey
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 mb-12">
          {statItems.map((item) => (
            <motion.div
              key={item.label}
              className="rounded-lg bg-card border p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -2 }}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {item.value.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">{item.label}</div>
            </motion.div>
          ))}
        </div>

        {stats.mostUsedLanguages.length > 0 && (
          <motion.div
            className="rounded-lg bg-muted/50 p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Most Used Languages
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.mostUsedLanguages.slice(0, 6).map((lang) => (
                <div key={lang.language} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-sm font-medium text-foreground">
                    {lang.language}
                  </span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {lang.percentage.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
