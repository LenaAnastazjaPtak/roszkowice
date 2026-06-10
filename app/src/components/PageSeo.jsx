import { useTranslation } from "react-i18next";
import { usePageSeo } from "../hooks/usePageSeo";

function PageSeo({
  pageKey,
  title,
  description,
  image,
  path,
  type,
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

  return null;
}

export default PageSeo;
