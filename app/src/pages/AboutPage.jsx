import { useTranslation } from "react-i18next";
import YouTubeEmbed from "../components/YouTubeEmbed";
import PageBanner from "../components/PageBanner";
import ContentBlockLink from "../components/ContentBlockLink";
import OnviewSection from "../components/OnviewSection";

function AboutPage() {
  const { t } = useTranslation("about");

  return (
    <>
      <PageBanner
        title={t("title")}
        image="/images/roszkowice/park/IMG_0345.jpg"
      />
      {/* <div className="container-fluid no-padding welcome-section2">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 content-block">
              <div className="section-header2">
                <span>{t("welcome.welcomeIn")}</span>
                <h2>{t("welcome.palaceName")}</h2>
              </div>
              <p>{t("welcome.paragraph1")}</p>
              <p>{t("welcome.paragraph2")}</p>
              <ContentBlockLink to="/gallery" title={t("seePhotos")}>
                {t("seePhotos")}
              </ContentBlockLink>
            </div>
            <div className="col-md-6 col-sm-6 img-block">
              <i>
                <img
                  src="/images/roszkowice/zewn/pionowa_zima.jpg"
                  alt={t("welcome.imgAlt")}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </i>
            </div>
          </div>
        </div>
      </div> */}
      <OnviewSection />
      <YouTubeEmbed url="https://www.youtube.com/watch?v=2OQFaQRg9-4" />
    </>
  );
}

export default AboutPage;
