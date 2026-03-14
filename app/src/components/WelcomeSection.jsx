import { useTranslation } from "react-i18next";

const slides = [
  {
    img: "/images/roszkowice/zewn/pionowa_zima.jpg",
    altKey: "welcome.altWinter",
    active: true,
  },
  {
    img: "/images/roszkowice/zewn/pionowe.jpg",
    altKey: "welcome.alt",
    active: false,
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
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris.
                    </p>
                    <a href="/about" title={t("welcome.readMore")}>
                      {t("welcome.readMore")}
                    </a>
                  </div>
                  <div className="col-md-6 col-sm-6 img-block">
                    <i>
                      <img
                        src={slide.img}
                        alt={t(slide.altKey)}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </i>
                  </div>
                </div>
              ))}
            </div>
            <div className="wc-controls">
              <a
                className="left carousel-control"
                href="/about"
                role="button"
                data-slide="prev"
              >
                <span></span>
              </a>
              <a
                className="right carousel-control"
                href="/about"
                role="button"
                data-slide="next"
              >
                <span></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;
