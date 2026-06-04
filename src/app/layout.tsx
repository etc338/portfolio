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

export const metadata: Metadata = {
  title: "Akshesh Patel | Full Stack Developer",
  description: "Portfolio of Akshesh Patel, a Full Stack Developer (MERN & Next.js) specializing in high-performance web applications, scalable APIs, and AI integrations.",
  keywords: ["Akshesh Patel", "Full Stack Developer", "MERN Stack", "Next.js", "React", "Node.js", "Software Engineer", "Ahmedabad", "Gujarat", "Web Developer"],
  authors: [{ name: "Akshesh Patel" }],
  creator: "Akshesh Patel",
  openGraph: {
    title: "Akshesh Patel | Full Stack Developer",
    description: "Portfolio of Akshesh Patel, a Full Stack Developer (MERN & Next.js) specializing in high-performance web applications, scalable APIs, and AI integrations.",
    url: "https://linkedin.com/in/aksheshpatel",
    siteName: "Akshesh Patel Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akshesh Patel | Full Stack Developer",
    description: "Portfolio of Akshesh Patel, a Full Stack Developer (MERN & Next.js) specializing in high-performance web applications, scalable APIs, and AI integrations.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
