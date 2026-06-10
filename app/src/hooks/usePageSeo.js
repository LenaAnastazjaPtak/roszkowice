import { useEffect } from "react";

const OG_LOCALE_BY_LANG = {
  pl: "pl_PL",
  en: "en_US",
  de: "de_DE",
};

function upsertMeta(selector, attributes, content) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function toAbsoluteUrl(path) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  return new URL(path, window.location.origin).href;
}

export function usePageSeo({
  title,
  description,
  image,
  path,
  locale,
  type = "website",
  noindex = false,
}) {
  useEffect(() => {
    const canonicalPath = path ?? window.location.pathname;
    const pageUrl = new URL(canonicalPath, window.location.origin).href;
    const imageUrl = image ? toAbsoluteUrl(image) : null;
    const ogLocale = OG_LOCALE_BY_LANG[locale?.slice(0, 2)] ?? OG_LOCALE_BY_LANG.pl;

    document.title = title;

    upsertMeta('meta[name="description"]', { name: "description" }, description);
    upsertMeta('meta[property="og:title"]', { property: "og:title" }, title);
    upsertMeta(
      'meta[property="og:description"]',
      { property: "og:description" },
      description,
    );
    upsertMeta('meta[property="og:type"]', { property: "og:type" }, type);
    upsertMeta('meta[property="og:url"]', { property: "og:url" }, pageUrl);
    upsertMeta('meta[property="og:locale"]', { property: "og:locale" }, ogLocale);
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, title);
    upsertMeta(
      'meta[name="twitter:description"]',
      { name: "twitter:description" },
      description,
    );

    if (imageUrl) {
      upsertMeta('meta[property="og:image"]', { property: "og:image" }, imageUrl);
      upsertMeta('meta[name="twitter:image"]', { name: "twitter:image" }, imageUrl);
    }

    upsertMeta(
      'meta[name="robots"]',
      { name: "robots" },
      noindex ? "noindex, nofollow" : "index, follow",
    );
    upsertLink("canonical", pageUrl);
  }, [title, description, image, path, locale, noindex]);
}
