// lib/config.ts
export const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const AGENT_AUTHOR = process.env.AGENT_AUTHOR || "";
export const AGENT_API_KEY = process.env.AGENT_API_KEY || "";

// Add site metadata configuration
export const siteMetadata = {
  name: "VirtualEra.ai",
  description: "Chat with unique AI personas in real-time conversations",
  url: process.env.NEXT_PUBLIC_APP_URL || `https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
  ogImage: "/og-image.png",
  author: AGENT_AUTHOR || "VirtualEra.ai",
  keywords: [
    "AI chat",
    "AI personas",
    "real-time conversation",
    "artificial intelligence",
    "virtual companions",
  ],
  // Public paths now match middleware
  publicPaths: [
    "/home",
    "/login",
    "/register",
    "/login/social",
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

