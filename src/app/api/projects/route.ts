/**
 * Projects API Route
 *
 * Provides project configuration data for the portfolio.
 * Supports dynamic project management and GitHub integration with proper error handling.
 */

import { NextResponse } from "next/server";
import { getEnhancedProjects, getFeaturedProjects, STATIC_PROJECTS } from "@/lib/projects-utils";

export async function GET() {
  try {
    // Try to get enhanced projects with GitHub data first
    let projects = await getEnhancedProjects();

    // If enhanced projects fail, fall back to static projects
    if (!projects || projects.length === 0) {
      console.warn("Enhanced projects failed, falling back to static projects");
      projects = await getFeaturedProjects();
    }

    if (!projects || projects.length === 0) {
      throw new Error("No projects data available");
    }

    return NextResponse.json({
      success: true,
      data: projects,
      enhanced: true, // Indicates if we got enhanced data with GitHub stats
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching projects:", error);

    // Enhanced error response with proper status code
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch projects data",
        message: error instanceof Error ? error.message : "Unknown error",
        fallback: true,
        data: STATIC_PROJECTS,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
