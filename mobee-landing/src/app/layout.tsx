import type { Metadata } from "next";
import { Manrope, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Analytics from '@/components/analytics';
import { OrganizationSchema, SoftwareApplicationSchema, WebSiteSchema } from '@/components/schema-markup';

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
  title: "MOOBEE - AI Talent Management | Gestione Talenti con IA",
  description:
    "🚀 Prima piattaforma AI certificata in Italia per la gestione talenti aziendali. Valutazione competenze, sviluppo carriera e analytics HR con intelligenza artificiale.",
  keywords: [
    "AI",
    "Talent Management",
    "Risorse Umane",
    "HR",
    "Italia",
    "MOOBEE",
    "gestione talenti",
    "valutazione competenze",
    "sviluppo carriera",
    "HR Tech",
    "intelligenza artificiale",
  ],
  authors: [{ name: "MOOBEE Team" }],
  creator: "MOOBEE",
  publisher: "MOOBEE",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://moobee.it",
    title: "MOOBEE - AI Talent Management | Gestione Talenti con IA",
    description:
      "🚀 Prima piattaforma AI certificata in Italia per la gestione talenti aziendali. Valutazione competenze, sviluppo carriera e analytics HR.",
    siteName: "MOOBEE",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "MOOBEE - AI Talent Management Platform"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MOOBEE - AI Talent Management | Gestione Talenti con IA",
    description:
      "🚀 Prima piattaforma AI certificata per gestione talenti aziendali. Valutazione competenze e sviluppo carriera con IA.",
    images: ["/og-image.png"],
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
        <OrganizationSchema />
        <SoftwareApplicationSchema />
        <WebSiteSchema />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
