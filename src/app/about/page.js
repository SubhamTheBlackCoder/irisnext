import AboutUs from "./about";

export const metadata = {
  title: "About Irisnex – Our Vision",
  description: "Learn about Irisnex’s mission to help job seekers succeed with smart resume technology and AI-powered tools.",
  metadataBase: new URL("https://www.irisnex.com/"),
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Irisnex",
    description: "Boost your hiring with AI resume matching.",
    url: "https://www.irisnex.com/about",
    siteName: "Irisnex",
    images: [
      {
        url: "https://www.irisnex.com/og-image.png", 
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Irisnex",
    description: "Boost your hiring with AI resume matching.",
    site: "@irisnex",
  },
};

export default function AboutPage() {
  return (
    <main>
    
      <AboutUs />
    </main>
  );
}
