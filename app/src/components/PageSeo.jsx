import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useJsonLd } from "../hooks/useJsonLd";
import { usePageSeo } from "../hooks/usePageSeo";
import { buildPageStructuredData } from "../shared/structuredData";

function PageSeo({
  pageKey,
  title,
  description,
  image,
  path,
  type,
  blogPost,
  noindex = false,
}) {
  const { t, i18n } = useTranslation("seo");
  const siteName = t("siteName");
  const pageTitle = title ?? t(`${pageKey}.title`);
  const pageDescription = description ?? t(`${pageKey}.description`);
  const pageImage = image ?? t("defaultImage");
  const documentTitle =
    pageKey === "home" && title === undefined
      ? pageTitle
      : `${pageTitle} | ${siteName}`;

  usePageSeo({
    title: documentTitle,
    description: pageDescription,
    image: pageImage,
    path,
    locale: i18n.language,
    type,
    noindex,
  });

  const structuredData = useMemo(() => {
    if (noindex) {
      return null;
    }

    return buildPageStructuredData({
      pageKey,
      siteName,
      title: documentTitle,
      description: pageDescription,
      image: pageImage,
      path,
      locale: i18n.language,
      blogPost,
    });
  }, [
    noindex,
    pageKey,
    siteName,
    documentTitle,
    pageDescription,
    pageImage,
    path,
    i18n.language,
    blogPost,
  ]);

  useJsonLd(structuredData);

  return null;
}

export default PageSeo;
