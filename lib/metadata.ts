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
    maximumScale: 5,
  };
}

const defaultMetadata = {
  title: "Virtuale.ai",
  description: "Every Conversation, A New Connection",
  image: "/og-image.png",
} as const;

export function constructMetadata({
  title = defaultMetadata.title,
  description = defaultMetadata.description,
  image = defaultMetadata.image,
  noIndex = false,
  isPublicPage = false,
  path = '/'
}: MetadataProps = {}): Metadata {
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
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://virtuale.ai'),
    title: {
      default: title,
      template: `%s | Virtuale.ai`,
    },
    description,
    keywords: [
      "AI chat",
      "AI personas",
      "real-time conversation",
      "artificial intelligence",
      "virtual companions",
    ],
    authors: [{ name: "Virtuale.ai" }],
    
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
      url: `${process.env.NEXT_PUBLIC_APP_URL}${path}`,
      title,
      description,
      siteName: "Virtuale.ai",
      images: [{
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      }],
    },
    
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
  };
}
