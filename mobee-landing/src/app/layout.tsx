import type { Metadata } from "next";
import { Manrope, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Analytics from '@/components/analytics';

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Moobee - AI Talent Management Platform",
  description:
    "Prima piattaforma AI certificata in Italia per valorizzare i talenti aziendali",
  keywords: [
    "AI",
    "Talent Management",
    "Risorse Umane",
    "HR",
    "Italia",
    "Moobee",
  ],
  authors: [{ name: "Moobee Team" }],
  creator: "Moobee",
  publisher: "Moobee",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://mobee.it",
    title: "Moobee - AI Talent Management Platform",
    description:
      "Prima piattaforma AI certificata in Italia per valorizzare i talenti aziendali",
    siteName: "Moobee",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moobee - AI Talent Management Platform",
    description:
      "Prima piattaforma AI certificata in Italia per valorizzare i talenti aziendali",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  icons: {
    icon: [
      { url: "/bee-icon.svg", sizes: "32x32", type: "image/svg+xml" },
      { url: "/icon", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/bee-icon.svg", sizes: "180x180", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="scroll-smooth">
      <body
        className={`${manrope.variable} ${ibmPlexSans.variable} font-body antialiased`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
