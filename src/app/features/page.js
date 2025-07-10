import Features from "./Feature";

export const metadata = {
  title: "Features | Irisnex – AI Resume Matching & ATS Scoring Tools",
  description:
    "Explore Irisnex's powerful features: AI resume parsing, ATS score generation, job-candidate matching, and more. Transform your hiring process today.",
  metadataBase: new URL("https://www.irisnex.com"),
  alternates: {
    canonical: "https://www.irisnex.com/features",
  },
  keywords: [
    "AI hiring features",
    "resume parsing",
    "ATS score tool",
    "applicant tracking system",
    "job matching",
    "AI recruitment features",
    "Irisnex tools",
    "AI hiring software",
    "resume scanner",
    "automated hiring solutions",
  ],
  openGraph: {
    title: "Irisnex Features – Resume Tools, ATS Scores, Job Matching",
    description:
      "See how Irisnex simplifies hiring with smart resume tools, ATS scoring, AI job matching, and real-time analysis.",
    url: "https://www.irisnex.com/features",
    siteName: "Irisnex",
    images: [
      {
        url: "https://www.irisnex.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Irisnex AI Resume Tools Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Irisnex Features – Resume Analysis, ATS Scoring, AI Matching",
    description:
      "Discover Irisnex’s core features: resume parsing, job matching, and ATS score insights powered by AI.",
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

export default function FeaturesPage() {
  return (
    <main>
      <Features />
    </main>
  );
}
