import { Metadata, Viewport } from "next"; 
import { AGENT_AUTHOR } from "./config"; // Import AGENT_AUTHOR

type MetadataProps = {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  isPublicPage?: boolean;
  path?: string;
}

// Separate viewport configuration
export function constructViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,       // Restrict max zoom to prevent auto-zoom on input focus
    userScalable: false,    // Disable user scaling entirely
  };
}

// Helper function to ensure HTTPS
function ensureHttps(url: string): string {
  if (url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }
  if (!url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

const defaultMetadata = {
  title: "VirtualEra.ai",
  description: "Every Conversation, A New Connection",
  image: `${ensureHttps(process.env.NEXT_PUBLIC_APP_URL || '')}/logo.png`,
} as const;

export function constructMetadata({
  title = defaultMetadata.title,
  description = defaultMetadata.description,
  image = defaultMetadata.image,
  noIndex = false,
  isPublicPage = false,
  path = '/'
}: MetadataProps = {}): Metadata {
  const baseUrl = ensureHttps(process.env.NEXT_PUBLIC_APP_URL || 'virtualera.ai');

  const shouldIndex = isPublicPage || [
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
  ].includes(path);

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s | VirtualEra.ai`,
    },
    description,
    keywords: [
      "AI chat",
      "AI personas",
      "real-time conversation",
      "artificial intelligence",
      "virtual companions",
    ],
    authors: [{ name: "VirtualEra.ai" }],
    
    robots: {
      index: shouldIndex && !noIndex,
      follow: shouldIndex && !noIndex,
      googleBot: {
        index: shouldIndex && !noIndex,
        follow: shouldIndex && !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${baseUrl}${path}`,
      title,
      description,
      siteName: "VirtualEra.ai",
      images: [{
        url: image.startsWith('http') ? ensureHttps(image) : `${baseUrl}${image}`,
        width: 1200,
        height: 630,
        alt: title,
        type: 'image/png',
      }],
    },
    
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.startsWith('http') ? ensureHttps(image) : `${baseUrl}${image}`],
    },
    
    icons: {
      icon: `${baseUrl}/favicon.ico`,
      shortcut: `${baseUrl}/favicon.ico`,
      apple: `${baseUrl}/favicon.ico`,
    },
  };
} 
