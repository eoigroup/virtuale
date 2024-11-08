// lib/config.ts
// Helper function to ensure HTTPS (same as in metadata.ts)
function ensureHttps(url: string): string {
  if (url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }
  if (!url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

// Get base URL with HTTPS
const baseUrl = ensureHttps(process.env.NEXT_PUBLIC_APP_URL || `https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

export const API_URL = ensureHttps(process.env.NEXT_PUBLIC_BACKEND_URL || '');
export const AGENT_AUTHOR = process.env.AGENT_AUTHOR || "";
export const AGENT_API_KEY = process.env.AGENT_API_KEY || "";

// Add site metadata configuration
export const siteMetadata = {
  name: "VirtualEra.ai",
  description: "Chat with unique AI personas in real-time conversations",
  url: baseUrl,
  ogImage: `${baseUrl}/logo.png`,  // Make image path absolute
  author: AGENT_AUTHOR || "VirtualEra.ai",
  keywords: [
    "AI chat",
    "AI personas",
    "real-time conversation",
    "artificial intelligence",
    "virtual companions",
  ],
  publicPaths: [
    "/home",
    "/login",
    "/register",
    "/login/social",
    "/contact",
    "/company",
    "/safety",
    "/suggest",
    "/support",
    "/partnerships",
    "/tos",
    "/privacy",
    "/careers",
    "/news",
    "/faq"
  ]
} as const;

// Add a type for type safety
export type SiteMetadata = typeof siteMetadata;

