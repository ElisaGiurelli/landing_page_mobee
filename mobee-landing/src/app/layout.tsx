import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mobee - AI Talent Management Platform",
  description: "Prima piattaforma AI certificata in Italia per valorizzare i talenti aziendali",
  keywords: ["AI", "Talent Management", "Risorse Umane", "HR", "Italia", "Mobee"],
  authors: [{ name: "Mobee Team" }],
  creator: "Mobee",
  publisher: "Mobee",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://mobee.it",
    title: "Mobee - AI Talent Management Platform",
    description: "Prima piattaforma AI certificata in Italia per valorizzare i talenti aziendali",
    siteName: "Mobee",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobee - AI Talent Management Platform",
    description: "Prima piattaforma AI certificata in Italia per valorizzare i talenti aziendali",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
