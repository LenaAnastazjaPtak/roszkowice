import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import YouTubeEmbed from "../components/YouTubeEmbed";
import PageBanner from "../components/PageBanner";

function AboutPage() {
  const { t } = useTranslation("about");

  return (
    <>
      <PageBanner
        title={t("title")}
        image="/images/roszkowice/park/IMG_0345.jpg"
      />
      <div className="container-fluid no-padding welcome-section2">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 img-block">
              <i>
                <img
                  src="/images/roszkowice/logo_with_white_background.png"
                  alt={t("welcome.imgAlt")}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </i>
            </div>
            <div className="col-md-6 col-sm-6 content-block">
              <div className="section-header2">
                <span>{t("welcome.welcomeIn")}</span>
                <h2>{t("welcome.palaceName")}</h2>
              </div>
              <p>{t("welcome.paragraph1")}</p>
              <p>{t("welcome.paragraph2")}</p>
              <Link to="/gallery" className="btn-link" title={t("seePhotos")}>
                {t("seePhotos")}
              </Link>
            </div>
          </div>
        </div>
      </div>
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
            <p>{t("onview.invite")}</p>
          </div>
        </div>
      </div>
      <YouTubeEmbed url="https://www.youtube.com/watch?v=gPcxPDInHqg" />
    </>
  );
}

export default AboutPage;
