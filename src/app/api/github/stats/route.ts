/**
 * GitHub Stats API Route
 *
 * Provides overall GitHub statistics for the portfolio including
 * repository counts, language statistics, and recent activity.
 */

import { NextResponse } from "next/server";
import { getGitHubStats } from "@/lib/github-utils";

export async function GET() {
  try {
    const stats = await getGitHubStats();

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch GitHub statistics",
      },
      { status: 500 }
    );
  }
}
