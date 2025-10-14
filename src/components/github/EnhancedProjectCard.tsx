"use client";

/**
 * Enhanced Project Card Component
 *
 * Extends the existing project cards with dynamic GitHub data including
 * real-time statistics, recent commits, and live repository information.
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { GitHubRepoStats } from "@/types/github";
import { getRepoNameFromUrl } from "@/lib/github-utils";
import { Badge } from "@/components/ui/badge";

interface EnhancedProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  index?: number;
}

export function EnhancedProjectCard({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  index = 0,
}: EnhancedProjectCardProps) {
  const [githubData, setGithubData] = useState<GitHubRepoStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!githubUrl) return;

    async function fetchGitHubData() {
      try {
        setLoading(true);
        const repoName = getRepoNameFromUrl(githubUrl || "");

        if (!repoName) {
          setError("Invalid GitHub URL");
          return;
        }

        const response = await fetch(
          `/api/github/repos/${encodeURIComponent(repoName)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch repository data");
        }

        const data = await response.json();

        if (data.success) {
          setGithubData(data.data);
        } else {
          throw new Error(data.error || "Unknown error");
        }
      } catch (err) {
        console.error("Error fetching GitHub data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load GitHub data"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, [githubUrl]);

  return (
    <motion.article
      className="flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex-1 p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          {githubData && (
            <div className="flex items-center gap-3 text-xs">
              {githubData.stars > 0 && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <FontAwesomeIcon icon={faStar} className="h-3 w-3" />
                  <span>{githubData.stars}</span>
                </div>
              )}
              {githubData.forks > 0 && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <FontAwesomeIcon icon={faCodeBranch} className="h-3 w-3" />
                  <span>{githubData.forks}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {description}
        </p>

        {/* GitHub Data Section */}
        {loading && (
          <div className="mb-4 animate-pulse">
            <div className="h-4 bg-muted-foreground/20 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-muted-foreground/20 rounded w-1/2"></div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-2 rounded bg-destructive/10 text-destructive text-xs">
            {error}
          </div>
        )}

        {githubData && (
          <motion.div
            className="mb-4 p-3 rounded-lg bg-muted/50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-medium text-foreground">
                {githubData.language && (
                  <>
                    <span className="w-2 h-2 rounded-full bg-primary inline-block mr-2"></span>
                    {githubData.language}
                  </>
                )}
              </span>
              <span className="text-muted-foreground">
                Updated {new Date(githubData.lastUpdated).toLocaleDateString()}
              </span>
            </div>

            {githubData.recentCommits.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs font-medium text-foreground mb-2">
                  Recent Activity
                </p>
                <div className="space-y-1">
                  {githubData.recentCommits.slice(0, 2).map((commit) => (
                    <div
                      key={commit.sha}
                      className="text-xs text-muted-foreground"
                    >
                      <span className="font-mono">
                        {commit.sha.substring(0, 7)}
                      </span>
                      <span className="ml-2">
                        {commit.commit.message.split("\n")[0].substring(0, 40)}
                        {commit.commit.message.length > 40 ? "..." : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Action Links */}
      <div className="flex items-center gap-x-4 border-t bg-muted/50 p-4">
        {githubUrl && (
          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View Code →
          </Link>
        )}
        {liveUrl && (
          <Link
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Live Demo →
          </Link>
        )}
      </div>
    </motion.article>
  );
}
