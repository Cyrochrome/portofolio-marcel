/**
 * Axios Configuration for GitHub API
 *
 * Centralized axios configuration with GitHub API defaults,
 * authentication handling, and error management.
 */

import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

/**
 * GitHub API Error interface
 */
interface GitHubApiError extends Error {
  status?: number;
  resetTime?: Date | null;
  data?: unknown;
}

/**
 * GitHub API configuration
 */
const GITHUB_API_BASE = "https://api.github.com";
const USERNAME = "Cyrochrome";

/**
 * Get GitHub token from environment variables
 */
function getGitHubToken(): string | null {
  // In Next.js, environment variables are available at runtime
  if (typeof window === 'undefined') {
    // Server-side
    return process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN || null;
  }
  // Client-side
  return null;
}

/**
 * Create axios instance with GitHub API configuration
 */
const githubApiClient: AxiosInstance = axios.create({
  baseURL: GITHUB_API_BASE,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor to add authorization token
 */
githubApiClient.interceptors.request.use(
  (config) => {
    const token = getGitHubToken();
    if (token) {
      config.headers.Authorization = `token ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for error handling and data extraction
 */
githubApiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      // Handle rate limiting
      if (status === 403 && error.response.headers['x-ratelimit-remaining'] === '0') {
        const resetTime = error.response.headers['x-ratelimit-reset'];
        const resetDate = resetTime ? new Date(parseInt(resetTime) * 1000) : null;

        const rateLimitError: GitHubApiError = new Error('GitHub API rate limit exceeded');
        rateLimitError.status = 429;
        rateLimitError.resetTime = resetDate;
        return Promise.reject(rateLimitError);
      }

      // Handle not found
      if (status === 404) {
        const notFoundError: GitHubApiError = new Error('Resource not found');
        notFoundError.status = 404;
        return Promise.reject(notFoundError);
      }

      // Handle server errors
      if (status >= 500) {
        const serverError: GitHubApiError = new Error('GitHub API server error');
        serverError.status = status;
        return Promise.reject(serverError);
      }

      // Handle other HTTP errors
      const errorMessage = (data as { message?: string })?.message || `HTTP ${status} error`;
      const httpError: GitHubApiError = new Error(errorMessage);
      httpError.status = status;
      httpError.data = data;
      return Promise.reject(httpError);
    }

    if (error.request) {
      // Network error
      const networkError: GitHubApiError = new Error('Network error - unable to connect to GitHub API');
      networkError.status = 0;
      return Promise.reject(networkError);
    }

    // Something else happened
    return Promise.reject(error);
  }
);

/**
 * Helper function to make GitHub API requests with Next.js caching support
 */
export async function githubApiRequest<T = unknown>(
  endpoint: string,
  options?: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: Record<string, unknown>;
    params?: Record<string, unknown>;
    revalidate?: number | false;
  }
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await githubApiClient.request({
      url: endpoint,
      method: options?.method || 'GET',
      data: options?.data,
      params: options?.params,
    });

    return response.data;
  } catch (error) {
    // Re-throw with proper error formatting
    throw error;
  }
}

/**
 * Helper function to create user-specific endpoints
 */
export function createUserEndpoint(path: string): string {
  return `/users/${USERNAME}${path}`;
}

/**
 * Helper function to create repository-specific endpoints
 */
export function createRepoEndpoint(repoName: string, path: string = ''): string {
  return `/repos/${USERNAME}/${repoName}${path}`;
}

export default githubApiClient;
