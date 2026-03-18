import { useTranslation } from "react-i18next";
import ContentBlockLink from "../components/ContentBlockLink";
import PageBanner from "../components/PageBanner";

function NotFoundPage() {
  const { t } = useTranslation("common");

  return (
    <>
      <PageBanner
        title="404"
        image="/images/roszkowice/remont/IMG_0284.jpg"
      />
      <div className="error-page container-fluid no-padding">
        <div className="padding-50"></div>
        <div className="container">
          <img src="/images/404.png" alt="404" />
          <div className="error-content">
            <h3>
              <span>{t("notFound.ups")}</span> {t("notFound.title")}
            </h3>
            <p className="error-back-link">
              <ContentBlockLink to="/" title={t("notFound.backHome")}>
                {t("notFound.backHome")}
              </ContentBlockLink>
            </p>
          </div>
        </div>
        <div className="section-padding"></div>
      </div>
    </>
  );
}

export default NotFoundPage;
