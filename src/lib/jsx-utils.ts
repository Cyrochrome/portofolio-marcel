import React from "react";

/**
 * JSX Utilities - Portfolio Marcel
 *
 * Utility functions for handling JSX content safely and ensuring ESLint compliance.
 * These functions help escape special characters that need to be properly handled
 * in JSX content to avoid ESLint errors.
 */

/**
 * JSX text escaping map
 * Maps unsafe characters to their HTML entity equivalents for JSX content
 */
const JSX_ESCAPE_MAP: Record<string, string> = {
  "'": "'",
  '"': '"',
  "&": "&",
  "<": "<",
  ">": ">",
};

/**
 * Escapes special characters in text to make it safe for JSX content
 *
 * This function handles the most common characters that need escaping in JSX:
 * - Apostrophes (') → '
 * - Quotes (") → "
 * - Ampersands (&) → &
 * - Less than (<) → <
 * - Greater than (>) → >
 *
 * @param {string} text - The text to escape
 * @returns {string} The escaped text safe for JSX content
 *
 * @example
 * ```typescript
 * import { escapeJsxText } from '@/lib/jsx-utils';
 *
 * // Basic usage
 * const safeText = escapeJsxText("I'm a developer & I'm passionate about <coding>");
 * console.log(safeText); // "I'm a developer & I'm passionate about <coding>"
 *
 * // In JSX
 * <p>{escapeJsxText("Don't worry about it")}</p>
 * ```
 */
export function escapeJsxText(text: string): string {
  if (typeof text !== "string") {
    return "";
  }

  return text.replace(/['"&<>]/g, (char) => JSX_ESCAPE_MAP[char] || char);
}

/**
 * Escapes only apostrophes in text for JSX compliance
 *
 * This is a specialized function for cases where you only need to handle
 * apostrophes, which are the most common cause of JSX ESLint errors.
 *
 * @param {string} text - The text to escape
 * @returns {string} The text with only apostrophes escaped
 *
 * @example
 * ```typescript
 * import { escapeApostrophes } from '@/lib/jsx-utils';
 *
 * const safeText = escapeApostrophes("I'm a developer");
 * console.log(safeText); // "I'm a developer"
 * ```
 */
export function escapeApostrophes(text: string): string {
  if (typeof text !== "string") {
    return "";
  }

  return text.replace(/'/g, "'");
}

/**
 * Simple utility to escape text for safe JSX rendering
 *
 * @param {string} text - The text to escape
 * @returns {string} The escaped text
 *
 * @example
 * ```tsx
 * import { escapeJsxText } from '@/lib/jsx-utils';
 *
 * function MyComponent() {
 *   return (
 *     <p>{escapeJsxText("I'm safe text with apostrophes!")}</p>
 *   );
 * }
 * ```
 */

/**
 * Type guard to check if a value is a string
 * Useful for conditional rendering and type safety
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * Safely converts a value to string with JSX escaping
 * Handles null, undefined, and non-string values gracefully
 */
export function safeString(value: unknown): string {
  if (!isString(value)) {
    return "";
  }
  return escapeJsxText(value);
}
