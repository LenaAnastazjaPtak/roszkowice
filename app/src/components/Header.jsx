import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LangToggle from "./LangToggle";
import LangSwitcherMobileToggle from "./LangSwitcherMobileToggle";
import LangSwitcherMobilePanel from "./LangSwitcherMobilePanel";
import ThemeToggle from "./ThemeToggle";

const SCROLL_HEIGHT_STICKY =
  typeof window !== "undefined" ? window.innerHeight : 600;

function Header() {
  const { t } = useTranslation("common");
  const [sticky, setSticky] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const headerRef = useRef(null);
  const headerHeightRef = useRef(0);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const shouldBeSticky = window.scrollY >= SCROLL_HEIGHT_STICKY;
      if (!sticky && shouldBeSticky && headerRef.current) {
        headerHeightRef.current = headerRef.current.offsetHeight;
      }
      setSticky(shouldBeSticky);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sticky]);

  useEffect(() => {
    if (!langOpen && !navOpen) return undefined;
    const closeAll = () => {
      setLangOpen(false);
      setNavOpen(false);
    };
    const handlePointerDown = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeAll();
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeAll();
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [langOpen, navOpen]);

  const toggleLang = () => {
    setLangOpen((open) => !open);
    setNavOpen(false);
  };

  const closeLang = () => setLangOpen(false);

  const toggleNav = () => {
    setNavOpen((open) => !open);
    setLangOpen(false);
  };

  const closeNav = () => setNavOpen(false);

  return (
    <>
      {sticky && (
        <div style={{ height: headerHeightRef.current }} aria-hidden="true" />
      )}
      <header
        ref={headerRef}
        id="header"
        className={`header-section container-fluid no-padding${sticky ? " navbar-fixed-top animated fadeInDown" : ""}`}
      >
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
                <ThemeToggle />
                <LangToggle />
              </ul>
              <div className="top-icons__hours">
                <h5 className="hours-line">
                  <span className="hours-text">{t("hoursBefore")}</span>
                  <span className="hours-palace">{t("hoursPalace")}</span>
                  <span className="hours-text">{t("hoursAfter")}</span>
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <nav className="navbar navbar-default ow-navigation" ref={navRef}>
            <div className="navbar-header">
              <button
                aria-controls="navbar"
                aria-expanded={navOpen}
                className={`navbar-toggle${navOpen ? " is-open" : ""}`}
                type="button"
                onClick={toggleNav}
              >
                <span className="sr-only">{t("nav.toggle")}</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <ThemeToggle variant="mobile" />
              <LangSwitcherMobileToggle
                open={langOpen}
                onToggle={toggleLang}
              />
              <Link to="/" className="navbar-brand">
                <img
                  src="/images/roszkowice/logo_with_transparent_background.png"
                  alt={t("logoAlt")}
                />
              </Link>
            </div>
            <LangSwitcherMobilePanel open={langOpen} onClose={closeLang} />
            <div
              className={`navbar-collapse navbar-right${navOpen ? " is-open" : ""}`}
              id="navbar"
            >
              <ul className="nav navbar-nav" onClick={closeNav}>
                <li>
                  <Link to="/about" title={t("nav.about")}>
                    {t("nav.about")}
                  </Link>
                </li>
                <li>
                  <Link to="/history" title={t("nav.history")}>
                    {t("nav.history")}
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" title={t("nav.gallery")}>
                    {t("nav.gallery")}
                  </Link>
                </li>
                <li>
                  <Link to="/blog" title={t("nav.blog")}>
                    {t("nav.blog")}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" title={t("nav.contact")}>
                    {t("nav.contact")}
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
