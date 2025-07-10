import AboutUs from "./about";

export const metadata = {
  title: "About Irisnex – AI Hiring Platform & Our Mission",
  description:
    "Learn about Irisnex's vision to transform hiring with AI resume matching, ATS scoring, and smart recruitment tools for businesses and job seekers.",
  metadataBase: new URL("https://www.irisnex.com"),
  alternates: {
    canonical: "https://www.irisnex.com/about",
  },
  keywords: [
    "About Irisnex",
    "AI hiring platform",
    "resume technology",
    "AI recruitment tools",
    "ATS software",
    "AI for job seekers",
    "AI resume analysis",
    "Irisnex mission",
    "Irisnex company profile",
    "smart resume matching"
  ],
  openGraph: {
    title: "About Irisnex – Revolutionizing AI-Powered Hiring",
    description:
      "Discover how Irisnex is reshaping hiring with AI-driven resume parsing, ATS scoring, and candidate matching tools.",
    url: "https://www.irisnex.com/about",
    siteName: "Irisnex",
    images: [
      {
        url: "https://www.irisnex.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Irisnex – AI Hiring Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Irisnex – Our Story & Vision",
    description:
      "Explore Irisnex’s journey and how we’re building smarter hiring tools with AI resume matching and ATS scoring.",
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

export default function AboutPage() {
  return (
    <main>
      <AboutUs />
    </main>
  );
}
