"use client";

/**
 * Theme Toggle Component - Portfolio Marcel
 *
 * Provides an accessible button to toggle between light and dark themes.
 * Features smooth animations and visual feedback for the current theme state.
 *
 * Features:
 * - Accessible button with proper ARIA labels
 * - Smooth icon transitions with Framer Motion
 * - Visual indication of current theme
 * - Keyboard navigation support
 * - Screen reader friendly
 */

import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faDesktop } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme, type Theme } from "@/lib/theme-provider";

/**
 * Theme toggle button component
 */
export function ThemeToggle(): React.JSX.Element {
  const { theme, actualTheme, setTheme } = useTheme();

  /**
   * Get icon for current theme
   */
  const getCurrentIcon = () => {
    switch (theme) {
      case "light":
        return faSun;
      case "dark":
        return faMoon;
      case "system":
        return faDesktop;
      default:
        return faSun;
    }
  };

  /**
   * Get theme display name
   */
  const getThemeDisplayName = (themeValue: Theme): string => {
    switch (themeValue) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      case "system":
        return "System";
      default:
        return "Light";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative h-9 w-9 rounded-full border border-border/50 bg-background/50 hover:bg-accent/50 transition-colors"
          aria-label={`Current theme: ${getThemeDisplayName(
            theme
          )}. Click to change theme.`}
        >
          <motion.div
            key={theme}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex h-4 w-4 items-center justify-center"
          >
            <FontAwesomeIcon
              icon={getCurrentIcon()}
              className="h-4 w-4 text-foreground/80"
            />
          </motion.div>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`cursor-pointer ${
            theme === "light" ? "bg-accent text-accent-foreground" : ""
          }`}
        >
          <FontAwesomeIcon icon={faSun} className="mr-2 h-4 w-4" />
          <span>Light</span>
          {theme === "light" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto h-2 w-2 rounded-full bg-primary"
            />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`cursor-pointer ${
            theme === "dark" ? "bg-accent text-accent-foreground" : ""
          }`}
        >
          <FontAwesomeIcon icon={faMoon} className="mr-2 h-4 w-4" />
          <span>Dark</span>
          {theme === "dark" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto h-2 w-2 rounded-full bg-primary"
            />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={`cursor-pointer ${
            theme === "system" ? "bg-accent text-accent-foreground" : ""
          }`}
        >
          <FontAwesomeIcon icon={faDesktop} className="mr-2 h-4 w-4" />
          <span>System</span>
          {theme === "system" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto h-2 w-2 rounded-full bg-primary"
            />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
