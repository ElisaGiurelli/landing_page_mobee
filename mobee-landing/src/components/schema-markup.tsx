export function OrganizationSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MOOBEE",
    alternateName: "MOOBEE AI Talent Management",
    description:
      "Piattaforma AI in Italia per la gestione talenti aziendali. Valutazione competenze, sviluppo carriera e analytics HR con intelligenza artificiale.",
    url: "https://moobee.it",
    logo: "https://moobee.it/logoMobeeV3.svg",
    foundingDate: "2024",
    foundingLocation: {
      "@type": "Place",
      addressCountry: "IT",
    },
    areaServed: "IT",
    knowsLanguage: ["it", "en"],
    sameAs: ["https://www.linkedin.com/company/moobee-ai"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "info@moobee.it",
      availableLanguage: ["Italian", "English"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "IT",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}

export function SoftwareApplicationSchema() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MOOBEE - AI Talent Management Platform",
    description:
      "Piattaforma AI per la gestione talenti aziendali con valutazione competenze, sviluppo carriera e analytics HR.",
    url: "https://moobee.it",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      description: "Demo gratuita disponibile",
    },
    author: {
      "@type": "Organization",
      name: "MOOBEE",
    },
    screenshot: "https://moobee.it/dashboard-screenshot.png",
    featureList: [
      "Valutazione competenze con AI",
      "Gestione talenti aziendali",
      "Analytics HR avanzati",
      "Sviluppo carriera personalizzato",
      "Dashboard intuitive",
      "Certificazione AI italiana",
    ],
    releaseNotes: "Piattaforma AI certificata per talent management",
    softwareVersion: "1.0",
    datePublished: "2024-01-01",
    publisher: {
      "@type": "Organization",
      name: "MOOBEE",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
    />
  );
}

export function WebSiteSchema() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MOOBEE - AI Talent Management",
    url: "https://moobee.it",
    description:
      "Piattaforma AI certificata in Italia per la gestione talenti aziendali",
    publisher: {
      "@type": "Organization",
      name: "MOOBEE",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://moobee.it/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    inLanguage: "it-IT",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  );
}
