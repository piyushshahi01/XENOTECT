/**
 * JSON-LD structured data for the homepage.
 * Adds Organization, WebSite, LocalBusiness and FAQPage schema for Google rich results.
 */
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.xenotectsolution.com/#organization",
        name: "XENOTECT",
        url: "https://www.xenotectsolution.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.xenotectsolution.com/og-image.png",
        },
        description:
          "XENOTECT is a premium digital engineering studio specializing in custom web development, AI automation, voice AI agents, UI/UX design, SEO, and digital marketing.",
        email: "hello@xenotect.com",
        telephone: "+1-800-000-0000",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Global",
          addressCountry: "US",
        },
        sameAs: [
          "https://twitter.com/xenotect",
          "https://linkedin.com/company/xenotect",
          "https://instagram.com/xenotect",
        ],
        areaServed: "Worldwide",
        serviceType: [
          "Web Development",
          "AI Solutions",
          "Digital Marketing",
          "UI/UX Design",
          "Business Automation",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.xenotectsolution.com/#website",
        url: "https://www.xenotectsolution.com",
        name: "XENOTECT",
        publisher: { "@id": "https://www.xenotectsolution.com/#organization" },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://www.xenotectsolution.com/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.xenotectsolution.com/#localbusiness",
        name: "XENOTECT",
        url: "https://www.xenotectsolution.com",
        logo: "https://www.xenotectsolution.com/og-image.png",
        image: "https://www.xenotectsolution.com/og-image.png",
        description: "Premium digital engineering studio providing custom software, web development, and AI solutions.",
        telephone: "+1-800-000-0000",
        priceRange: "$$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Global",
          addressCountry: "US"
        }
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Dynamic FAQPage schema for specific sections.
 */
export function FAQSchema({ faqs }: { faqs: { q: string; a: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Service Schema for individual service pages (e.g. Web Development, AI, Growth)
 */
export function ServiceSchema({
  name,
  description,
  url,
  providerName = "XENOTECT",
  category,
  areaServed,
  audience,
  offers
}: {
  name: string;
  description: string;
  url: string;
  providerName?: string;
  category?: string;
  areaServed?: string | string[];
  audience?: string;
  offers?: any;
}) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: providerName,
      "@id": "https://www.xenotectsolution.com/#organization",
    },
    url,
  };

  if (category) schema.category = category;
  if (areaServed) schema.areaServed = areaServed;
  if (audience) {
    schema.audience = {
      "@type": "Audience",
      audienceType: audience
    };
  }
  if (offers) schema.offers = offers;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * BreadcrumbList schema for service and inner pages.
 * items: array of { name, url } in order from home → current page
 */
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * BlogPosting / Article schema for individual blog post pages.
 */
export function ArticleSchema({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
  authorName = "XENOTECT Team",
}: {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    image: imageUrl || "https://www.xenotectsolution.com/og-image.png",
    author: {
      "@type": "Organization",
      name: authorName,
      url: "https://www.xenotectsolution.com",
    },
    publisher: {
      "@type": "Organization",
      name: "XENOTECT",
      "@id": "https://www.xenotectsolution.com/#organization",
      logo: {
        "@type": "ImageObject",
        url: "https://www.xenotectsolution.com/og-image.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * WebPage schema for standalone pages (Portfolio, Privacy, etc.)
 */
export function WebPageSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    isPartOf: {
      "@id": "https://www.xenotectsolution.com/#website",
    },
    publisher: {
      "@id": "https://www.xenotectsolution.com/#organization",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
