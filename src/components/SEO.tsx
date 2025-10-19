import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Tělovýchovná jednota Krupka z.s. | Snowkiting a Trail Park",
  description = "Objevte snowkiting v Krušných horách, trail park Komárka a další outdoorové aktivity s TJK Krupka. Kurzy, půjčovna, ubytování a mnoho dalšího!",
  keywords = "snowkiting, trail park, Krupka, Krušné hory, outdoor, kurzy, bike park, MTB, Komárka",
  image = "/images/og-image.jpg",
  url = "https://tjkrupka.cz",
  type = "website",
  author = "Tělovýchovná jednota Krupka z.s.",
  publishedTime,
  modifiedTime,
}) => {
  const siteName = "TJK Krupka";
  const fullTitle = title.includes("TJK") ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="cs_CZ" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Article Meta (if applicable) */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* Additional Meta */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SportsOrganization",
          name: "Tělovýchovná jednota Krupka z.s.",
          url: "https://tjkrupka.cz",
          logo: "https://tjkrupka.cz/tjk-logo-header.png",
          description: description,
          address: {
            "@type": "PostalAddress",
            addressCountry: "CZ",
            addressLocality: "Krupka",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+420-123-456-789",
            contactType: "customer service",
            email: "info@tjkrupka.cz",
          },
          sameAs: [
            "https://www.facebook.com/tjkrupka",
            "https://www.instagram.com/tjkrupka",
            "https://www.youtube.com/@tjkrupka",
          ],
        })}
      </script>

      {/* Structured Data - WebSite */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteName,
          url: "https://tjkrupka.cz",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://tjkrupka.cz/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
