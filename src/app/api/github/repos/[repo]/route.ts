/**
 * GitHub Repository API Route
 *
 * Provides detailed information about a specific repository including
 * statistics, languages, and recent commits.
 */

import { NextResponse } from "next/server";
import { getRepositoryStats } from "@/lib/github-utils";

interface RouteParams {
  params: {
    repo: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { repo } = params;

    if (!repo) {
      return NextResponse.json(
        {
          success: false,
          error: "Repository name is required",
        },
        { status: 400 }
      );
    }

    const stats = await getRepositoryStats(repo);

    if (!stats) {
      return NextResponse.json(
        {
          success: false,
          error: "Repository not found or inaccessible",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching repository data:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch repository data",
      },
      { status: 500 }
    );
  }
}
