import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harshify - Music Discovery Platform",
  description: "Discover and explore music from multiple platforms with AI-powered analysis. Search, play, and analyze your favorite songs.",
  keywords: ["Harshify", "music", "discovery", "Spotify", "AI", "search", "playlists", "songs"],
  authors: [{ name: "Harshify Team" }],
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Harshify - Music Discovery Platform",
    description: "Discover and explore music from multiple platforms with AI-powered analysis",
    url: "https://harshify.vercel.app",
    siteName: "Harshify",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshify - Music Discovery Platform",
    description: "Discover and explore music from multiple platforms with AI-powered analysis",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
