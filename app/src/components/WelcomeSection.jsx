import { useTranslation } from "react-i18next";
import ContentBlockLink from "./ContentBlockLink";

const slides = [
  {
    img: "/images/roszkowice/zewn/pionowa_zima.jpg",
    altKey: "welcome.alt",
    active: true,
  },
];

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
            <h2>{t("welcome.title")}</h2>
          </div>
        </div>
        <div className="row">
          <div
            id="welcome-carousel"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner" role="listbox">
              {slides.map((slide) => (
                <div
                  key={slide.img}
                  className={`item${slide.active ? " active" : ""}`}
                >
                  <div className="col-md-6 col-sm-6 content-block">
                    <p>{t("welcome.text")}</p>
                    <ContentBlockLink to="/history" title={t("welcome.readMore")}>
                      {t("welcome.readMore")}
                    </ContentBlockLink>
                  </div>
                  <div className="col-md-6 col-sm-6 img-block">
                    <i className="welcome-section__img-wrap">
                      <img
                        src={slide.img}
                        alt={t(slide.altKey)}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                          display: "block",
                        }}
                      />
                    </i>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="wc-controls">
              <a
                className="left carousel-control"
                href="#welcome-carousel"
                role="button"
                data-slide="prev"
              >
                <span></span>
              </a>
              <a
                className="right carousel-control"
                href="#welcome-carousel"
                role="button"
                data-slide="next"
              >
                <span></span>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;
