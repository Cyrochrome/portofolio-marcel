/**
 * Projects API Route
 *
 * Provides dynamic project data from GitHub repositories with flexible filtering.
 * Supports multiple project types and fallback to static data when needed.
 */

import { NextResponse } from "next/server";
import {
  getFeaturedProjects,
  getRecentProjects,
  getAllProjects,
  getDynamicProjects,
  STATIC_PROJECTS,
  ProjectFilters
} from "@/lib/projects-utils";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'featured'; // featured, recent, all, dynamic
    const limit = parseInt(searchParams.get('limit') || '10');
    const minStars = searchParams.get('minStars') ? parseInt(searchParams.get('minStars')!) : undefined;
    const sortBy = searchParams.get('sortBy') as ProjectFilters['sortBy'];
    const excludeForks = searchParams.get('excludeForks') === 'true';

    let projects;

    switch (type) {
      case 'featured':
        projects = await getFeaturedProjects();
        break;

      case 'recent':
        projects = await getRecentProjects(limit);
        break;

      case 'all':
        projects = await getAllProjects();
        break;

      case 'dynamic':
        const filters: ProjectFilters = {
          limit,
          minStars,
          sortBy,
          excludeForks,
        };
        projects = await getDynamicProjects(filters);
        break;

      default:
        projects = await getFeaturedProjects();
    }

    if (!projects || projects.length === 0) {
      throw new Error("No projects data available");
    }

    return NextResponse.json({
      success: true,
      data: projects,
      type,
      count: projects.length,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Error fetching projects:", error);

    // Enhanced error response with fallback data
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
