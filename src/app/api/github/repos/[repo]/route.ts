/**
 * GitHub Repository API Route
 *
 * Provides detailed information about a specific repository including
 * statistics, languages, and recent commits with enhanced error handling.
 */

import { NextResponse } from "next/server";
import { getRepositoryStats } from "@/lib/github-utils";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ repo: string }> }
) {
  try {
    const { repo } = await params;

    if (!repo || typeof repo !== "string" || repo.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          error: "Repository name is required",
          message: "Please provide a valid repository name",
        },
        { status: 400 }
      );
    }

    // Handle repository names without owner prefix
    let fullRepoName = repo;
    if (!repo.includes("/")) {
      // If no owner prefix, assume it's owned by Cyrochrome
      fullRepoName = `Cyrochrome/${repo}`;
    }

    // Validate repository name format (owner/repo)
    if (!fullRepoName.includes("/")) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid repository format",
          message: "Repository name must be in format 'owner/repo'",
        },
        { status: 400 }
      );
    }

    const stats = await getRepositoryStats(fullRepoName);

    if (!stats) {
      return NextResponse.json(
        {
          success: false,
          error: "Repository not found or inaccessible",
          message: "The repository may be private, deleted, or the name may be incorrect",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
      repo: repo,
    });
  } catch (error) {
    console.error("Error fetching repository data:", error);

    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes("fetch")) {
        return NextResponse.json(
          {
            success: false,
            error: "Network error",
            message: "Unable to connect to GitHub API",
          },
          { status: 503 }
        );
      }

      if (error.message.includes("rate limit")) {
        return NextResponse.json(
          {
            success: false,
            error: "Rate limit exceeded",
            message: "GitHub API rate limit exceeded. Please try again later.",
          },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: "Failed to fetch repository data",
      },
      { status: 500 }
    );
  }
}
