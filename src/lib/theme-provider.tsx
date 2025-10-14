"use client";

/**
 * Theme Provider - Portfolio Marcel
 *
 * Provides theme context and state management for light/dark theme switching.
 * Includes local storage persistence and system preference detection.
 *
 * Features:
 * - Light/dark theme state management
 * - System preference detection
 * - Local storage persistence
 * - Smooth theme transitions
 * - TypeScript support
 */

import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * Theme type definition
 */
export type Theme = "light" | "dark" | "system";

/**
 * Theme context interface
 */
interface ThemeContextType {
  theme: Theme;
  actualTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/**
 * Theme context
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Theme provider props
 */
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

/**
 * Theme provider component
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "portfolio-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [actualTheme, setActualTheme] = useState<"light" | "dark">("light");

  /**
   * Get system theme preference
   */
  const getSystemTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  /**
   * Update actual theme based on current theme setting
   */
  const updateActualTheme = (currentTheme: Theme) => {
    let newActualTheme: "light" | "dark";

    if (currentTheme === "system") {
      newActualTheme = getSystemTheme();
    } else {
      newActualTheme = currentTheme;
    }

    setActualTheme(newActualTheme);

    // Apply theme to document
    const root = document.documentElement;
    if (newActualTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  /**
   * Set theme and persist to localStorage
   */
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(storageKey, newTheme);
  };

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = () => {
    const newTheme = actualTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  /**
   * Initialize theme on mount
   */
  useEffect(() => {
    // Load theme from localStorage or use default
    const storedTheme = localStorage.getItem(storageKey) as Theme;
    const initialTheme = storedTheme || defaultTheme;
    setThemeState(initialTheme);
  }, [storageKey, defaultTheme]);

  /**
   * Update actual theme when theme changes
   */
  useEffect(() => {
    updateActualTheme(theme);
  }, [theme]);

  /**
   * Listen for system theme changes
   */
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      updateActualTheme("system");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const value: ThemeContextType = {
    theme,
    actualTheme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * Custom hook to use theme context
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
