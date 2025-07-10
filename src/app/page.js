// ✅ No "use client" here!

import Home from "./home/page";

// ---- SEO HEAD / METADATA ----
export const metadata = {
  title: "Home | Irisnex – AI-Powered Hiring",
  description:
    "Irisnex is an AI-powered hiring tool that analyzes resumes, calculates ATS scores, and helps you find the best candidates instantly.",
  metadataBase: new URL("https://www.irisnex.com"),
  alternates: {
    canonical: "https://www.irisnex.com",
  },
  keywords: [
    "AI hiring tool",
    "resume analyzer",
    "ATS resume checker",
    "automated recruitment",
    "AI job matching",
    "AI HR software",
    "resume parsing",
    "applicant tracking system",
    "Irisnex",
    "AI powered hiring",
  ],
  openGraph: {
    title: "Irisnex – AI-Powered Hiring Platform",
    description:
      "Irisnex helps companies hire faster with AI resume matching, parsing, and ATS scoring.",
    url: "https://www.irisnex.com",
    siteName: "Irisnex",
    images: [
      {
        url: "https://www.irisnex.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Irisnex AI hiring dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Irisnex – AI Hiring Tool",
    description:
      "Find the best candidates with Irisnex, an AI-driven resume matching and ATS scoring platform.",
    site: "@irisnex",
    creator: "@irisnex",
    images: ["https://www.irisnex.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "Technology",
};


export default function HomePage() {
  return (
    <main>
      <Home />
    </main>
  );
}
