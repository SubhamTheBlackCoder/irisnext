// ✅ No "use client" here!

import Home from "./home/page";

// ---- SEO HEAD / METADATA ----
export const metadata = {
  title: "Home | Irisnex – AI-Powered Hiring",
  description: "Boost your hiring with AI resume matching and ATS score generation.",
  metadataBase: new URL("https://www.irisnex.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Home | Irisnex",
    description: "Boost your hiring with AI resume matching.",
    url: "https://www.irisnex.com",
    siteName: "Irisnex",
    images: [
      {
        url: "https://www.irisnex.com/og-image.png", // Replace with real OG image
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | Irisnex",
    description: "Boost your hiring with AI resume matching.",
    site: "@irisnex",
  },
};

export default function HomePage() {
  return (
    <main>
      <Home />
    </main>
  );
}
