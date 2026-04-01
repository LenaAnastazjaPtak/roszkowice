import { useTranslation } from "react-i18next";
import PageBanner from "../components/PageBanner";
import ContentBlockLink from "../components/ContentBlockLink";

function HistoryPage() {
  const { t } = useTranslation("history");
  const section1 = t("section1", { returnObjects: true });
  const section2 = t("section2", { returnObjects: true });

  return (
    <>
      <PageBanner
        title={t("title")}
        image="/images/roszkowice/remont/20231011_135743.jpg"
      />
      <div className="container-fluid no-padding welcome-section2">
        <div className="container">
          <div className="row" style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            <div className="col-md-6 col-sm-6 content-block">
              <div className="section-header2">
                <span>{t("intro.sectionLabel")}</span>
                <h2>{t("intro.heading")}</h2>
              </div>
              <p>{t("welcome.text", { ns: "home" })}</p>
            </div>
            <div className="col-md-6 col-sm-6 img-block">
              <i>
                <img
                  src="/images/roszkowice/zewn/palac_dawniej.jpg"
                  alt={t("intro.heading")}
                  style={{ width: "100%", height: "400px", objectFit: "cover" }}
                />
              </i>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid no-padding onview-section onview-section--compact">
        <div className="container" style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          <div className="col-md-5 col-sm-5 col-xs-12 img-block">
            <img
              src="/images/roszkowice/zewn/pocztowki.jpg"
              alt={t("title")}
              style={{ width: "100%", height: "400px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-7 col-sm-7 col-xs-12 onview-content">
            {section1.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="container-fluid no-padding welcome-section2">
        <div className="container">
          <div className="row" style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            <div className="col-md-6 col-sm-6 content-block">
              {section2.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
              <ContentBlockLink to="/blog" title={t("seeBlog")}>
                {t("seeBlog")}
              </ContentBlockLink>
            </div>
            <div className="col-md-6 col-sm-6 img-block">
              <i>
                <img
                  src="/images/roszkowice/zewn/jesien.jpg"
                  alt={t("title")}
                  style={{ width: "100%", height: "400px", objectFit: "cover" }}
                />
              </i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryPage;
