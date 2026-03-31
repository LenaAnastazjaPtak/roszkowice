import { useTranslation } from "react-i18next";
import PageBanner from "../components/PageBanner";
import ContentBlockLink from "../components/ContentBlockLink";

function HistoryPage() {
  const { t } = useTranslation("history");

  return (
    <>
      <PageBanner
        title={t("title")}
        image="/images/roszkowice/park/IMG_0345.jpg"
      />
      <div className="container-fluid no-padding welcome-section2">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 content-block">
              <div className="section-header2">
                <span>{t("intro.sectionLabel")}</span>
                <h2>{t("intro.heading")}</h2>
              </div>
              <p>{t("intro.paragraph1")}</p>
              <p>{t("intro.paragraph2")}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid no-padding onview-section">
        <div className="container">
          <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 onview-content">
            <div className="section-header">
              <div className="section-title-border">
                <span>{t("timeline.sectionLabel")}</span>
                <h2>{t("timeline.heading")}</h2>
              </div>
            </div>
            <div className="history-timeline">
              <div className="history-period">
                <h4>{t("timeline.period1.year")}</h4>
                <h3>{t("timeline.period1.title")}</h3>
                <p>{t("timeline.period1.description")}</p>
              </div>
              <div className="history-period">
                <h4>{t("timeline.period2.year")}</h4>
                <h3>{t("timeline.period2.title")}</h3>
                <p>{t("timeline.period2.description")}</p>
              </div>
              <div className="history-period">
                <h4>{t("timeline.period3.year")}</h4>
                <h3>{t("timeline.period3.title")}</h3>
                <p>{t("timeline.period3.description")}</p>
              </div>
            </div>
            <ContentBlockLink to="/about" title={t("seeAbout")}>
              {t("seeAbout")}
            </ContentBlockLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryPage;
