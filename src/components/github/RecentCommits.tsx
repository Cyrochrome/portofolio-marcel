"use client";

/**
 * Recent Commits Component
 *
 * Displays a timeline of recent commits across all repositories
 * with author information, commit messages, and timestamps.
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitHubCommit } from "@/types/github";
import { formatCommitMessage, formatDate } from "@/lib/github-utils";

interface RecentCommitsProps {
  className?: string;
  limit?: number;
}

export function RecentCommits({
  className = "",
  limit = 10,
}: RecentCommitsProps) {
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCommits() {
      try {
        setLoading(true);
        const response = await fetch("/api/github/stats");

        if (!response.ok) {
          throw new Error("Failed to fetch recent commits");
        }

        const data = await response.json();

        if (data.success) {
          setCommits(data.data.recentActivity.slice(0, limit));
        } else {
          throw new Error(data.error || "Unknown error");
        }
      } catch (err) {
        console.error("Error fetching recent commits:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load recent commits"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCommits();
  }, [limit]);

  if (loading) {
    return (
      <section className={`container px-4 py-16 mx-auto lg:px-8 ${className}`}>
        <div className="mx-auto max-w-4xl">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-start gap-4">
                <div className="w-10 h-10 bg-muted-foreground/20 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-muted-foreground/20 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted-foreground/20 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || commits.length === 0) {
    return (
      <section className={`container px-4 py-16 mx-auto lg:px-8 ${className}`}>
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-lg bg-muted/50 p-6">
            <p className="text-muted-foreground">
              {error || "No recent commits found"}
            </p>
          </div>
        </div>
      </section>
    );
  }

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
            Recent Activity
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Latest commits and updates across my projects
          </p>
        </motion.div>

        <div className="space-y-6">
          {commits.map((commit, index) => (
            <motion.div
              key={commit.sha}
              className="flex items-start gap-4 p-4 rounded-lg bg-card border hover:bg-muted/50 transition-colors"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ x: 4 }}
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                {commit.author?.avatar_url ? (
                  <img
                    src={commit.author.avatar_url}
                    alt={commit.author.login}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      {commit.commit.author.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Commit Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-foreground truncate">
                    {commit.commit.author.name}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(commit.commit.author.date)}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                  {formatCommitMessage(commit.commit.message)}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="font-mono bg-muted px-2 py-1 rounded">
                    {commit.sha.substring(0, 7)}
                  </span>
                  {commit.author?.login && <span>@{commit.author.login}</span>}
                </div>
              </div>

              {/* Commit Link */}
              <div className="flex-shrink-0">
                <a
                  href={commit.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  View →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href="https://github.com/Cyrochrome"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            View all activity on GitHub
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
