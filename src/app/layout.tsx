import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const siteUrl = "https://akshesh-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Akshesh Patel | Full Stack Developer",
    template: "%s | Akshesh Patel",
  },
  description:
    "Akshesh Patel — Full Stack Developer from Ahmedabad, Gujarat. Expert in MERN Stack, Next.js, .NET, React, Node.js, and AI integrations. View portfolio, client projects, and hire Akshesh for web development.",
  keywords: [
    "Akshesh Patel",
    "Akshesh",
    "Patel Akshesh",
    "Full Stack Developer",
    "Full Stack Developer Ahmedabad",
    "MERN Stack Developer",
    "Next.js Developer",
    "React Developer India",
    "Node.js Developer",
    ".NET Developer",
    "Software Engineer Gujarat",
    "Web Developer Ahmedabad",
    "Hire Full Stack Developer",
    "Akshesh Patel portfolio",
    "Akshesh Patel developer",
    "Tecoreng developer",
    "ReactJS developer India",
  ],
  authors: [{ name: "Akshesh Patel", url: siteUrl }],
  creator: "Akshesh Patel",
  publisher: "Akshesh Patel",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Akshesh Patel | Portfolio",
    title: "Akshesh Patel | Full Stack Developer — MERN, Next.js & .NET",
    description:
      "Akshesh Patel — Full Stack Developer from Ahmedabad, Gujarat. MERN Stack, Next.js, .NET, AI integrations. View live projects and hire for web development.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akshesh Patel | Full Stack Developer",
    description:
      "Akshesh Patel — Full Stack Developer specializing in MERN Stack, Next.js, .NET and AI integrations. Based in Ahmedabad, Gujarat.",
    creator: "@aksheshpatel",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

// JSON-LD Structured Data — tells Google exactly who Akshesh Patel is
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Akshesh Patel",
  url: siteUrl,
  image: `${siteUrl}/og-image.png`,
  sameAs: [
    "https://www.linkedin.com/in/akshesh-patel-b49888192/",
    "https://github.com/Patelakshesh",
  ],
  jobTitle: "Full Stack Developer",
  worksFor: {
    "@type": "Organization",
    name: "Tecoreng - Technical Core Engineering",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  email: "aksheshpatel2019@gmail.com",
  knowsAbout: [
    "JavaScript",
    "ReactJS",
    "Next.js",
    "Node.js",
    "MongoDB",
    "Express.js",
    ".NET",
    "Full Stack Development",
    "MERN Stack",
    "AI Integration",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${outfit.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
