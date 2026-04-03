import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { scrollToTop } from "../shared/scrollToTop";

const SCROLL_HEIGHT_STICKY = typeof window !== "undefined" ? window.innerHeight : 600;

function Header() {
  const { t, i18n } = useTranslation("common");
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY >= SCROLL_HEIGHT_STICKY);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header id="header" className={`header-section container-fluid no-padding${sticky ? " navbar-fixed-top animated fadeInDown" : ""}`}>
      <div className="top-header container-fluid no-padding">
        <div className="col-md-7 col-sm-12 col-xs-12 top-content no-padding">
          <a href="tel:+48795000596" className="header-phone-link">
            <i className="fa fa-phone"></i>
            <b>+48 795 000 596</b>
          </a>
          <div className="top-icons">
            <ul>
              <li>
                <a
                  href="https://www.facebook.com/p/Pa%C5%82ac-Roszkowice-100084550065108/?locale=pl_PL"
                  title="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/palac_roszkowice/"
                  title="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-instagram"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@PałacRoszkowice"
                  title="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-youtube"></i>
                </a>
              </li>
            </ul>
            <div className="lang-toggle">
              <button
                type="button"
                className={`lang-option${i18n.language === "pl" ? " active" : ""}`}
                onClick={() => i18n.changeLanguage("pl")}
                aria-label="Polski"
              >
                PL
              </button>
              <span className="lang-separator">|</span>
              <button
                type="button"
                className={`lang-option${i18n.language === "en" ? " active" : ""}`}
                onClick={() => i18n.changeLanguage("en")}
                aria-label="English"
              >
                EN
              </button>
              <span className="lang-separator">|</span>
              <button
                type="button"
                className={`lang-option${i18n.language === "de" ? " active" : ""}`}
                onClick={() => i18n.changeLanguage("de")}
                aria-label="Deutsch"
              >
                DE
              </button>
            </div>
            <h5 className="hours-line">
              <span className="hours-text">{t("hoursBefore")}</span>
              <span className="hours-palace">{t("hoursPalace")}</span>
              <span className="hours-text">{t("hoursAfter")}</span>
            </h5>
          </div>
        </div>
      </div>
      <div className="container">
        <nav className="navbar navbar-default ow-navigation">
          <div className="navbar-header">
            <button
              aria-controls="navbar"
              aria-expanded="false"
              data-target="#navbar"
              data-toggle="collapse"
              className="navbar-toggle collapsed"
              type="button"
            >
              <span className="sr-only">{t("nav.toggle")}</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand" onClick={scrollToTop}>
              <img
                src="/images/roszkowice/logo_with_transparent_background.png"
                alt="Logo"
                style={{
                  maxWidth: "100px",
                  height: "100px",
                  objectFit: "contain",
                }}
              />
            </Link>
          </div>
          <div className="navbar-collapse collapse navbar-right" id="navbar">
            <ul className="nav navbar-nav">
              {/* <li>
                <Link to="/" title={t("nav.home")}>
                  {t("nav.home")}
                </Link>
              </li> */}
              <li>
                <Link to="/about" title={t("nav.about")} onClick={scrollToTop}>
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link to="/history" title={t("nav.history")} onClick={scrollToTop}>
                  {t("nav.history")}
                </Link>
              </li>
              <li>
                <Link to="/gallery" title={t("nav.gallery")} onClick={scrollToTop}>
                  {t("nav.gallery")}
                </Link>
              </li>
              <li>
                <Link to="/blog" title={t("nav.blog")} onClick={scrollToTop}>
                  {t("nav.blog")}
                </Link>
                {/* <i className="ddl-switch fa fa-angle-down"></i>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/blog" title={t("nav.blog")}>
                      {t("nav.blog")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog/post/0" title={t("nav.blogPost")}>
                      {t("nav.blogPost")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" title={t('footer.terms')}>
                      {t('footer.terms')}
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy" title={t('footer.privacy')}>
                      {t('footer.privacy')}
                    </Link>
                  </li>
                  <li>
                    <Link to="/404" title="404">
                      404
                    </Link>
                  </li>
                </ul> */}
              </li>
              <li>
                <Link to="/contact" title={t("nav.contact")} onClick={scrollToTop}>
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
