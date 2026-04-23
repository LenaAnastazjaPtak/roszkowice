import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ContentBlockLink from "./ContentBlockLink";

const MOBILE_BREAKPOINT = 768;
const HOME_LIMIT_DESKTOP = 12;
const HOME_LIMIT_MOBILE = 6;
const VITE_API_URL = import.meta.env.VITE_API_URL;
if (!VITE_API_URL) {
  throw new Error("Missing required env variable: VITE_API_URL");
}

const filters = [
  { filter: "*", labelKey: "gallery.all" },
  { filter: ".exterior", labelKey: "gallery.exterior" },
  { filter: ".park", labelKey: "gallery.park" },
  { filter: ".remont", labelKey: "gallery.remont" },
];

function GallerySection({ standalone = false }) {
  const { t } = useTranslation("home");
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState("*");
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`${VITE_API_URL}/api/gallery`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API responded with ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (cancelled) {
          return;
        }
        const mapped = data.map((item) => ({
          id: item.id,
          src: item.src,
          category: item.category,
          classes: `col-md-3 col-sm-3 ${item.category}`,
        }));
        setGalleryItems(mapped);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) {
          return;
        }
        setError(err);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const close = useCallback(() => setSelectedIndex(null), []);
  const goPrev = useCallback(() => {
    setSelectedIndex((i) =>
      i === null || galleryItems.length === 0
        ? null
        : (i - 1 + galleryItems.length) % galleryItems.length,
    );
  }, []);
  const goNext = useCallback(() => {
    setSelectedIndex((i) =>
      i === null || galleryItems.length === 0 ? null : (i + 1) % galleryItems.length,
    );
  }, [galleryItems.length]);

  const filteredWithIndex =
    activeFilter === "*"
      ? galleryItems.map((item, index) => ({ item, index }))
      : galleryItems
          .map((item, index) => ({ item, index }))
          .filter(({ item }) => item.category === activeFilter.slice(1));

  const displayLimit = standalone
    ? undefined
    : isMobile
      ? HOME_LIMIT_MOBILE
      : HOME_LIMIT_DESKTOP;
  const displayedItems =
    displayLimit === undefined
      ? filteredWithIndex
      : filteredWithIndex.slice(0, displayLimit);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, close, goPrev, goNext]);

  return (
    <div className="container-fluid no-padding portfolio-section">
      <div className="container">
        {standalone ? (
          <div className="col-md-12 col-sm-12 col-xs-12 no-padding portfolio-categories">
            <ul id="filters">
              {filters.map(({ filter, labelKey }) => (
                <li key={filter}>
                  <button
                    type="button"
                    className={`portfolio-filter-link${activeFilter === filter ? " active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveFilter(filter);
                    }}
                    data-filter={filter}
                  >
                    {t(labelKey)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-5">
              <div className="section-header">
                <div className="section-title-border">
                  <span>{t("gallery.subtitle")}</span>
                  <h2>{t("gallery.title")}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-7 portfolio-categories">
              <ul id="filters">
                {filters.map(({ filter, labelKey }) => (
                  <li key={filter}>
                    <button
                      type="button"
                      className={`portfolio-filter-link${activeFilter === filter ? " active" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveFilter(filter);
                      }}
                      data-filter={filter}
                    >
                      {t(labelKey)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="portfolio-section-gallery-wrap">
        {loading && <div className="container text-center">Ładowanie...</div>}
        {error && (
          <div className="container text-center">
            Nie udało się załadować galerii.
          </div>
        )}
        <div className="portfolio-list">
          {displayedItems.map(({ item, index }) => (
            <div
              key={item.id}
              className={`portfolio-box no-padding ${item.classes}`}
            >
              <a
                href={item.src}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedIndex(index);
                }}
              >
                <img src={item.src} alt="Roszkowice" />
                <div className="portfolio-content">
                  <i className="icon icon-Search"></i>
                  <h3>{t("gallery.palace")}</h3>
                  <span>{t("gallery.galleryLabel")}</span>
                </div>
              </a>
            </div>
          ))}
        </div>
        {!standalone && (
          <div className="container text-center portfolio-section-cta">
            <ContentBlockLink to="/gallery" title={t("gallery.seeFullGallery")}>
              {t("gallery.seeFullGallery")}
            </ContentBlockLink>
          </div>
        )}
      </div>
      {selectedIndex !== null && (
        <div
          className="gallery-modal-overlay"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={t("gallery.galleryLabel")}
        >
          <button
            type="button"
            className="gallery-modal-close"
            onClick={close}
            aria-label={t("gallery.close")}
          >
            ×
          </button>
          <button
            type="button"
            className="gallery-modal-prev"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label={t("gallery.previous")}
          >
            ‹
          </button>
          <button
            type="button"
            className="gallery-modal-next"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label={t("gallery.next")}
          >
            ›
          </button>
          <img
            src={galleryItems[selectedIndex].src}
            alt="Roszkowice"
            className="gallery-modal-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default GallerySection;
