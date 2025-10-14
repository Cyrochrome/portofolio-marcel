/**
 * Projects API Route
 *
 * Provides project configuration data for the portfolio.
 * Supports dynamic project management and GitHub integration.
 */

import { NextResponse } from "next/server";
import { getFeaturedProjects, STATIC_PROJECTS } from "@/lib/projects-utils";

export async function GET() {
  try {
    const projects = await getFeaturedProjects();

    return NextResponse.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);

    // Fallback to static projects
    return NextResponse.json({
      success: true,
      data: STATIC_PROJECTS,
    });
  }
}
