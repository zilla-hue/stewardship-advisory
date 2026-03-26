import { Helmet } from "react-helmet-async";

// --- Constants ---

const SITE_URL = "https://stewardshipadvisory.com";
const SITE_NAME = "Stewardship Advisory";
const DEFAULT_OG_IMAGE = "/image/og-default.png";

// --- Types ---

interface PageSEOProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  isHome?: boolean;
}

// --- Component ---

const PageSEO = ({
  title,
  description,
  path,
  ogImage,
  isHome = false,
}: PageSEOProps) => {
  const computedTitle = isHome ? title : `${title} | ${SITE_NAME}`;
  const ogImageUrl = SITE_URL + (ogImage || DEFAULT_OG_IMAGE);
  const canonicalUrl = SITE_URL + path;

  return (
    <Helmet>
      <title>{computedTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={computedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default PageSEO;
