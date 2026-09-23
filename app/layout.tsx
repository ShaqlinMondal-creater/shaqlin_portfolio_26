import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { profile, socials } from "@/data/portfolio";
import { theme, themeStyle } from "@/lib/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shaqlin Mondal — Full Stack Developer",
  description:
    "Shaqlin Mondal is a mid-senior PHP full stack developer in Kolkata. Laravel, MySQL, Tailwind, and WooCommerce. Twelve live projects.",
};

export const viewport: Viewport = {
  themeColor: theme.ink,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      addressCountry: "IN",
    },
    sameAs: socials.map((social) => social.href),
  };

  return (
    <html lang="en" style={themeStyle} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="font-sans">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      </body>
    </html>
  );
}
