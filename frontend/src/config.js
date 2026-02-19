/**
 * API base URL for backend requests.
 * Set VITE_API_URL in your environment (e.g., Vercel env vars).
 * Fallback to localhost for local development.
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
