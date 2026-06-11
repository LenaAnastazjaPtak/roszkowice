import {
  SITE_EMAIL,
  SITE_GEO,
  SITE_LOGO_PATH,
  SITE_PHONE,
  SITE_POSTAL_ADDRESS,
  SITE_SOCIAL_URLS,
  SITE_URL,
  toAbsoluteSiteUrl,
} from "./siteConfig";
import { buildPostPath } from "./postUrl";

function buildPublisher() {
  return {
    "@type": "Organization",
    name: "Pałac Roszkowice",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: toAbsoluteSiteUrl(SITE_LOGO_PATH),
    },
  };
}

function buildLandmark({ name, description, image }) {
  return {
    "@type": "LandmarksOrHistoricalBuildings",
    name,
    description,
    url: SITE_URL,
    image: toAbsoluteSiteUrl(image),
    address: {
      "@type": "PostalAddress",
      ...SITE_POSTAL_ADDRESS,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_GEO.latitude,
      longitude: SITE_GEO.longitude,
    },
    telephone: SITE_PHONE,
    email: SITE_EMAIL,
    sameAs: SITE_SOCIAL_URLS,
  };
}

function buildWebSite({ name }) {
  return {
    "@type": "WebSite",
    name,
    url: SITE_URL,
    publisher: buildPublisher(),
  };
}

function buildWebPage({ name, description, url, locale, siteName }) {
  return {
    "@type": "WebPage",
    name,
    description,
    url,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: SITE_URL,
    },
  };
}

function buildBlogPosting({ post, description, image, url, siteName }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    image: image ? toAbsoluteSiteUrl(image) : undefined,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: siteName,
    },
    publisher: buildPublisher(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
  };
}

export function buildPageStructuredData({
  pageKey,
  siteName,
  title,
  description,
  image,
  path,
  locale,
  blogPost,
}) {
  if (blogPost) {
    const pageUrl = toAbsoluteSiteUrl(path ?? buildPostPath(blogPost));
    return buildBlogPosting({
      post: blogPost,
      description,
      image,
      url: pageUrl,
      siteName,
    });
  }

  const pageUrl = toAbsoluteSiteUrl(path ?? "/");

  if (pageKey === "home") {
    return {
      "@context": "https://schema.org",
      "@graph": [
        buildWebSite({ name: siteName }),
        buildLandmark({
          name: siteName,
          description,
          image,
        }),
      ],
    };
  }

  if (pageKey === "contact") {
    return {
      "@context": "https://schema.org",
      "@graph": [
        buildLandmark({
          name: siteName,
          description,
          image,
        }),
        buildWebPage({
          name: title,
          description,
          url: pageUrl,
          locale,
          siteName,
        }),
      ],
    };
  }

  if (!pageKey || pageKey === "notFound") {
    return null;
  }

  return {
    "@context": "https://schema.org",
    ...buildWebPage({
      name: title,
      description,
      url: pageUrl,
      locale,
      siteName,
    }),
  };
}
