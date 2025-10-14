"use client";

/**
 * Projects Filter Section Component
 *
 * Interactive controls for filtering, searching, and sorting projects.
 * Client component for handling user interactions and communicating with parent.
 */

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Grid, List } from "lucide-react";
import { ProjectConfig } from "@/lib/projects-utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trackEvent } from "@/lib/analytics-utils";

type SortOption = "priority" | "name" | "recent";
type FilterOption = "all" | "featured" | "technology";
type ViewMode = "grid" | "list";

interface ProjectsFilterSectionProps {
  projects: ProjectConfig[];
  onFilteredProjectsChange: (projects: ProjectConfig[]) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

/**
 * Projects filter section - Client Component
 *
 * @param {ProjectsFilterSectionProps} props - Component props
 * @returns {React.JSX.Element} The rendered filter section
 */
export function ProjectsFilterSection({
  projects,
  onFilteredProjectsChange,
  viewMode,
  onViewModeChange,
}: ProjectsFilterSectionProps): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("priority");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const [selectedTechnology, setSelectedTechnology] = useState<string>("");

  // Get all unique technologies for filter dropdown
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((project) => {
      project.technologies.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  // Filter and sort projects whenever dependencies change
  useEffect(() => {
    let filtered = projects;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(query)
          )
      );
    }

    // Apply category filter
    if (filterBy === "featured") {
      filtered = filtered.filter((project) => project.featured);
    } else if (filterBy === "technology" && selectedTechnology) {
      filtered = filtered.filter((project) =>
        project.technologies.includes(selectedTechnology)
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title);
        case "recent":
          return (
            new Date(b.githubUrl ? "2024-01-01" : "2023-01-01").getTime() -
            new Date(a.githubUrl ? "2024-01-01" : "2023-01-01").getTime()
          );
        case "priority":
        default:
          return (a.priority || 999) - (b.priority || 999);
      }
    });

    onFilteredProjectsChange(sorted);
  }, [projects, searchQuery, sortBy, filterBy, selectedTechnology]);

  return (
    <section className="container px-4 py-8 mx-auto lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim()) {
                    trackEvent({
                      name: "project_search",
                      properties: {
                        query: e.target.value,
                        location: "projects_page",
                      },
                    });
                  }
                }}
                className="pl-10"
              />
            </div>

            {/* Filters and Sort */}
            <div className="flex flex-wrap gap-3">
              {/* Filter */}
              <Select
                value={filterBy}
                onValueChange={(value: FilterOption) => {
                  setFilterBy(value);
                  trackEvent({
                    name: "project_filter_changed",
                    properties: {
                      filter_type: value,
                      location: "projects_page",
                    },
                  });
                }}
              >
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="featured">Featured Only</SelectItem>
                  <SelectItem value="technology">By Technology</SelectItem>
                </SelectContent>
              </Select>

              {/* Technology Filter (when technology filter is selected) */}
              {filterBy === "technology" && (
                <Select
                  value={selectedTechnology}
                  onValueChange={(value) => {
                    setSelectedTechnology(value);
                    trackEvent({
                      name: "technology_filter_selected",
                      properties: {
                        technology: value,
                        location: "projects_page",
                      },
                    });
                  }}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select technology..." />
                  </SelectTrigger>
                  <SelectContent>
                    {allTechnologies.map((tech) => (
                      <SelectItem key={tech} value={tech}>
                        {tech}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {/* Sort */}
              <Select
                value={sortBy}
                onValueChange={(value: SortOption) => {
                  setSortBy(value);
                  trackEvent({
                    name: "project_sort_changed",
                    properties: {
                      sort_option: value,
                      location: "projects_page",
                    },
                  });
                }}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="priority">Featured First</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    onViewModeChange("grid");
                    trackEvent({
                      name: "view_mode_changed",
                      properties: {
                        view_mode: "grid",
                        location: "projects_page",
                      },
                    });
                  }}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    onViewModeChange("list");
                    trackEvent({
                      name: "view_mode_changed",
                      properties: {
                        view_mode: "list",
                        location: "projects_page",
                      },
                    });
                  }}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchQuery ||
            (filterBy === "technology" && selectedTechnology)) && (
            <motion.div
              className="flex flex-wrap gap-2 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: &quot;{searchQuery}&quot;
                  <button
                    onClick={() => setSearchQuery("")}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {filterBy === "technology" && selectedTechnology && (
                <Badge variant="secondary" className="gap-1">
                  Tech: {selectedTechnology}
                  <button
                    onClick={() => setSelectedTechnology("")}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
