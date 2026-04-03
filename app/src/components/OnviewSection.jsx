import { useTranslation } from "react-i18next";
import ContentBlockLink from "./ContentBlockLink";

function OnviewSection({ showReadMore }) {
  const { t } = useTranslation("about");

  return (
    <div className="container-fluid no-padding onview-section">
      <div className="container">
        <div className="col-md-5 col-sm-5 col-xs-12 img-block">
          <img
            src="/images/roszkowice/zewn/pionowe.jpg"
            alt={t("onview.imgAlt")}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-7 col-sm-7 col-xs-12 onview-content">
          <div className="section-header">
            <div className="section-title-border">
              <span>{t("onview.sectionLabel")}</span>
              <h2>{t("onview.heading")}</h2>
            </div>
          </div>
          <p>{t("onview.paragraph1")}</p>
          <p>{t("onview.paragraph2")}</p>
          <p>{t("onview.paragraph3")}</p>
          <p>{t("onview.paragraph4")}</p>
          <p>{t("onview.paragraph5")}</p>
          {showReadMore && (
            <ContentBlockLink to="/about" title="Dowiedz się co u nas">
              DOWIEDZ SIĘ CO U NAS
            </ContentBlockLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default OnviewSection;
