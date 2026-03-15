import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ContentBlockLink from "./ContentBlockLink";

const MOBILE_BREAKPOINT = 768;
const HOME_LIMIT_DESKTOP = 12;
const HOME_LIMIT_MOBILE = 6;

const zewnFiles = [
  "11.jpg",
  "22.png",
  "DJI_0520.JPG",
  "DSC09468.JPG",
  "IMG-20251021-WA0011.jpg",
  "jesien.jpg",
  "kopula.jpg",
  "palac_dawniej.jpg",
  "pionowa_zima.jpg",
  "pionowe.jpg",
  "pocztowki.jpg",
  "zima.jpg",
];
const parkFiles = [
  "20251019_140721.jpg",
  "20251019_155511.jpg",
  "20251019_161301.jpg",
  "20251019_161848.jpg",
  "IMG_0345.jpg",
  "park.jpg",
];
const remontFiles = [
  "2007%20(1).jpg",
  "2007%20(2).jpg",
  "2007%20(4).jpg",
  "2007%20(5).jpg",
  "2014%20(1).JPG",
  "20230716_134946.jpg",
  "20231011_135743.jpg",
  "20251019_135913.jpg",
  "20251214_142137.jpg",
  "IMG_0284.jpg",
  "IMG_0285-2.jpg",
  "IMG_0286-2.jpg",
  "IMG_0287.jpg",
  "IMG_0288.jpg",
  "IMG_0289.jpg",
  "IMG_0304.jpg",
  "IMG_0307.jpg",
  "IMG_0308.jpg",
  "IMG_0312.jpg",
  "IMG_0313.jpg",
  "IMG_0315.jpg",
  "IMG_0316.jpg",
  "IMG_0319.jpg",
  "IMG_0323.jpg",
  "IMG_0325.jpg",
  "IMG_0338.jpg",
  "IMG_0341.jpg",
  "IMG_0346.jpg",
  "IMG_0352.jpg",
  "IMG_0363.jpg",
];

const galleryItems = [
  ...zewnFiles.map((file) => ({
    src: `/images/roszkowice/zewn/${file}`,
    classes: "col-md-3 col-sm-3 exterior",
  })),
  ...parkFiles.map((file) => ({
    src: `/images/roszkowice/park/${file}`,
    classes: "col-md-3 col-sm-3 park",
  })),
  ...remontFiles.map((file) => ({
    src: `/images/roszkowice/remont/${file}`,
    classes: "col-md-3 col-sm-3 remont",
  })),
];

const filters = [
  { filter: "*", labelKey: "gallery.all" },
  { filter: ".exterior", labelKey: "gallery.exterior" },
  { filter: ".park", labelKey: "gallery.park" },
  { filter: ".remont", labelKey: "gallery.remont" },
];

function GallerySection({ standalone = false }) {
  const { t } = useTranslation("home");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState("*");
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT,
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const close = useCallback(() => setSelectedIndex(null), []);
  const goPrev = useCallback(() => {
    setSelectedIndex((i) =>
      i === null ? null : (i - 1 + galleryItems.length) % galleryItems.length,
    );
  }, []);
  const goNext = useCallback(() => {
    setSelectedIndex((i) =>
      i === null ? null : (i + 1) % galleryItems.length,
    );
  }, []);

  const filteredWithIndex =
    activeFilter === "*"
      ? galleryItems.map((item, index) => ({ item, index }))
      : galleryItems
          .map((item, index) => ({ item, index }))
          .filter(({ item }) => item.classes.includes(activeFilter.slice(1)));

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
                  <a
                    href="#"
                    className={activeFilter === filter ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveFilter(filter);
                    }}
                    data-filter={filter}
                  >
                    {t(labelKey)}
                  </a>
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
                    <a
                      href="#"
                      className={activeFilter === filter ? "active" : ""}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveFilter(filter);
                      }}
                      data-filter={filter}
                    >
                      {t(labelKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="portfolio-list">
        {displayedItems.map(({ item, index }) => (
          <div
            key={item.src}
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
        <div
          className="container text-center"
          style={{ marginTop: "4rem", marginBottom: "4rem" }}
        >
          <ContentBlockLink href="/gallery" title={t("gallery.seeFullGallery")}>
            {t("gallery.seeFullGallery")}
          </ContentBlockLink>
        </div>
      )}
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
            aria-label="Zamknij"
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
            aria-label="Poprzednie"
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
            aria-label="Następne"
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
