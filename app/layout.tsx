import { constructMetadata, constructViewport } from "@/lib/metadata";

import { Inter } from "next/font/google";
import Providers from "./providers";
import dynamic from "next/dynamic";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import "./globals.css";

const Toaster = dynamic(() => import("@/components/toaster/toaster"), {
  ssr: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


// Replaced static metadata with the constructed version
export const metadata = constructMetadata({
  isPublicPage: true,
  path: '/',
  // You can override any default values here if needed
  // title: "Virtualera.ai",
  // description: "Every Conversation, A New Connection",
});

// Viewport configuration
export const viewport = constructViewport();


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
