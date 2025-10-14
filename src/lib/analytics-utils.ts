import { track } from "@vercel/analytics";

/**
 * Analytics utility functions for tracking custom events in the portfolio
 */

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean>;
}

/**
 * Track custom analytics events
 */
export function trackEvent(event: AnalyticsEvent) {
  track(event.name, event.properties);
}

/**
 * Track project view events
 */
export function trackProjectView(projectName: string, projectCategory?: string) {
  track("project_viewed", {
    project_name: projectName,
    project_category: projectCategory || "uncategorized",
  });
}

/**
 * Track contact form interactions
 */
export function trackContactInteraction(action: "opened" | "submitted" | "error") {
  track("contact_form_interaction", {
    action,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track theme changes
 */
export function trackThemeChange(theme: string) {
  track("theme_changed", {
    theme,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track navigation events
 */
export function trackNavigation(page: string, from?: string) {
  track("navigation", {
    page,
    from: from || "unknown",
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(depth: number) {
  // Only track at certain milestones to avoid too many events
  if (depth >= 25 && depth % 25 === 0) {
    track("scroll_depth", {
      depth: Math.floor(depth),
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Track time spent on page
 */
export function trackTimeOnPage(timeInSeconds: number, page: string) {
  // Track at 30s, 1m, 2m, 5m intervals
  const intervals = [30, 60, 120, 300];
  const closestInterval = intervals.find(interval => timeInSeconds >= interval);

  if (closestInterval) {
    track("time_on_page", {
      time_spent: closestInterval,
      page,
      timestamp: new Date().toISOString(),
    });
  }
}
