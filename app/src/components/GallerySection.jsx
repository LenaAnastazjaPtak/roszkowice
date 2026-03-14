import { useTranslation } from "react-i18next";

const zewnFiles = [
  "11.jpg",
  "20251019_153013.jpg",
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
  "IMG_0302.jpg",
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
  { filter: "*", labelKey: "gallery.all", active: true },
  { filter: ".exterior", labelKey: "gallery.exterior", active: false },
  { filter: ".park", labelKey: "gallery.park", active: false },
  { filter: ".remont", labelKey: "gallery.remont", active: false },
];

function GallerySection({ standalone = false }) {
  const { t } = useTranslation("home");

  return (
    <div className="container-fluid no-padding portfolio-section">
      <div className="container">
        {standalone ? (
          <div className="col-md-12 col-sm-12 col-xs-12 no-padding portfolio-categories">
            <ul id="filters">
              {filters.map(({ filter, labelKey, active }) => (
                <li key={filter}>
                  {/* <a
                    data-filter={filter}
                    className={active ? "active" : ""}
                    href="#"
                  > */}
                    {t(labelKey)}
                  {/* </a> */}
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
                {filters.map(({ filter, labelKey, active }) => (
                  <li key={filter}>
                    {/* <a
                      data-filter={filter}
                      className={active ? "active" : ""}
                      href="#"
                    > */}
                      {t(labelKey)}
                    {/* </a> */}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="portfolio-list">
        {galleryItems.map((item) => (
          <div
            key={item.src}
            className={`portfolio-box no-padding ${item.classes}`}
          >
            <a href={item.src}>
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
    </div>
  );
}

export default GallerySection;
