import { useTranslation } from "react-i18next";
import ContentBlockLink from "./ContentBlockLink";
import ScrollRevealImage from "./ScrollRevealImage";

const WELCOME_IMAGE_SRC = "/images/roszkowice/zewn/pionowa_zima.jpg";

function WelcomeSection() {
  const { t } = useTranslation("home");

  return (
    <div
      id="welcome-section"
      className="container-fluid no-padding welcome-section"
    >
      <div className="container">
        <div className="section-header">
          <div className="section-title-border">
            <span>{t("welcome.welcomeTo")}</span>
            <h1>{t("welcome.title")}</h1>
          </div>
        </div>
        <div className="row welcome-section__layout">
          <div className="col-md-6 col-sm-6 content-block">
            <p>{t("welcome.text")}</p>
            <ContentBlockLink to="/history" title={t("welcome.readMore")}>
              {t("welcome.readMore")}
            </ContentBlockLink>
          </div>
          <ScrollRevealImage className="col-md-6 col-sm-6 img-block">
            <i className="welcome-section__img-wrap">
              <img
                src={WELCOME_IMAGE_SRC}
                alt={t("welcome.alt")}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  display: "block",
                }}
              />
            </i>
          </ScrollRevealImage>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;
