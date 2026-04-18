import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SLIDER_IMAGES = [
  "sliderFirst.jpg",
  "DSC09468.JPG",
  "kopula.jpg",
  "zima.jpg",
];

const slideData = SLIDER_IMAGES.map((filename, i) => ({
  img: `/images/roszkowice/slider/${filename}`,
  pretitleKey: `slider.slides.${i}.pretitle`,
  titleKey: `slider.slides.${i}.title`,
  subtitleKey: `slider.slides.${i}.subtitle`,
  layerIds: [
    `slide-layer-${i * 4 + 1}`,
    `slide-layer-${i * 4 + 2}`,
    `slide-layer-${i * 4 + 3}`,
    `slide-layer-${i * 4 + 4}`,
  ],
}));

const SLIDER_CAPTION_ANIMATION_PRESET = "calm";

const SLIDER_LAYER_ATTRS_BY_PRESET = {
  calm: {
    preTitle: {
      className:
        "tp-caption NotGeneric-Title tp-resizeme rs-parallaxlevel-0 slider-pretitle",
      data: {
        x: "['center','center','center','center']",
        hoffset: "['0','0','0','0']",
        y: "['middle','middle','middle','middle']",
        voffset: "['-132','-128','-120','-78']",
        fontsize: "['96','92','88','50']",
        lineheight: "['108','100','96','58']",
        width: "none",
        height: "none",
        whitespace: "nowrap",
        transform_idle: "o:1;",
        transform_in:
          "y:[22%];z:0;rX:0deg;rY:0deg;rZ:0deg;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2600;e:Power2.easeOut;",
        transform_out:
          "y:[100%];s:1000;e:Power2.easeInOut;s:1000;e:Power2.easeInOut;",
        mask_in: "x:0px;y:0px;s:inherit;e:inherit;",
        mask_out: "x:inherit;y:inherit;s:inherit;e:inherit;",
        start: "650",
        splitin: "none",
        splitout: "none",
        responsive_offset: "on",
      },
      style: {
        zIndex: 5,
        whiteSpace: "nowrap",
        position: "relative",
        color: "#fff",
        fontWeight: 700,
        letterSpacing: "3.15px",
        fontFamily: "var(--font-body)",
        textTransform: "uppercase",
      },
    },
    title: {
      className: "tp-caption NotGeneric-Title tp-resizeme rs-parallaxlevel-0",
      data: {
        x: "['center','center','center','center']",
        hoffset: "['0','0','0','0']",
        y: "['middle','middle','middle','middle']",
        voffset: "['42','38','34','22']",
        fontsize: "['50','48','44','32']",
        lineheight: "['60','56','52','40']",
        width: "none",
        height: "none",
        whitespace: "nowrap",
        transform_idle: "o:1;",
        transform_in:
          "y:[22%];z:0;rX:0deg;rY:0deg;rZ:0deg;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2600;e:Power2.easeOut;",
        transform_out:
          "y:[100%];s:1000;e:Power2.easeInOut;s:1000;e:Power2.easeInOut;",
        mask_in: "x:0px;y:0px;s:inherit;e:inherit;",
        mask_out: "x:inherit;y:inherit;s:inherit;e:inherit;",
        start: "900",
        splitin: "none",
        splitout: "none",
        responsive_offset: "on",
      },
      style: {
        zIndex: 5,
        whiteSpace: "nowrap",
        position: "relative",
        color: "#fff",
        fontWeight: 700,
        letterSpacing: "3.15px",
        fontFamily: "var(--font-body)",
        textTransform: "uppercase",
      },
    },
    subTitle: {
      className:
        "tp-caption NotGeneric-SubTitle tp-resizeme rs-parallaxlevel-0",
      data: {
        x: "['center','center','center','center']",
        hoffset: "['0','0','0','0']",
        y: "['middle','middle','middle','middle']",
        voffset: "['124','118','112','88']",
        fontsize: "['44','42','38','30']",
        lineheight: "['54','50','46','38']",
        width: "none",
        height: "none",
        whitespace: "nowrap",
        transform_idle: "o:1;",
        transform_in:
          "y:[42%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2400;e:Power2.easeOut;",
        transform_out:
          "y:[100%];s:1000;e:Power2.easeInOut;s:1000;e:Power2.easeInOut;",
        mask_in: "x:0px;y:[100%];s:inherit;e:inherit;",
        mask_out: "x:inherit;y:inherit;s:inherit;e:inherit;",
        start: "1250",
        splitin: "none",
        splitout: "none",
        responsive_offset: "on",
      },
      style: {
        zIndex: 6,
        whiteSpace: "nowrap",
        position: "relative",
        color: "#fff",
        fontWeight: 700,
        letterSpacing: "3.15px",
        fontFamily: "var(--font-body)",
        textTransform: "uppercase",
      },
    },
    btn: {
      className:
        "tp-caption NotGeneric-Title tp-resizeme rs-parallaxlevel-0 slide-btn",
      data: {
        x: "['center','center','center','center']",
        hoffset: "['0','0','0','0']",
        y: "['top','top','top','top']",
        voffset: "['625','625','625','625']",
        fontsize: "['70','70','70','12']",
        lineheight: "['70','70','70','90']",
        width: "none",
        height: "none",
        whitespace: "normal",
        transform_idle: "o:1;",
        transform_in:
          "y:[42%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2400;e:Power2.easeOut;",
        transform_out:
          "y:[100%];s:1000;e:Power2.easeInOut;s:1000;e:Power2.easeInOut;",
        mask_in: "x:0px;y:[100%];s:inherit;e:inherit;",
        mask_out: "x:inherit;y:inherit;s:inherit;e:inherit;",
        start: "1400",
        splitin: "none",
        splitout: "none",
        responsive_offset: "on",
      },
      style: { zIndex: 6, position: "relative" },
    },
  },
  dramatic: {
    preTitle: {
      className:
        "tp-caption NotGeneric-Title tp-resizeme rs-parallaxlevel-0 slider-pretitle",
      data: {
        x: "['center','center','center','center']",
        hoffset: "['0','0','0','0']",
        y: "['middle','middle','middle','middle']",
        voffset: "['-132','-128','-120','-78']",
        fontsize: "['96','92','88','50']",
        lineheight: "['108','100','96','58']",
        width: "none",
        height: "none",
        whitespace: "nowrap",
        transform_idle: "o:1;",
        transform_in:
          "x:[105%];z:0;rX:45deg;rY:0deg;rZ:90deg;sX:1;sY:1;skX:0;skY:0;s:2000;e:Power4.easeInOut;",
        transform_out:
          "y:[100%];s:1000;e:Power2.easeInOut;s:1000;e:Power2.easeInOut;",
        mask_in: "x:0px;y:0px;s:inherit;e:inherit;",
        mask_out: "x:inherit;y:inherit;s:inherit;e:inherit;",
        start: "700",
        splitin: "chars",
        splitout: "none",
        responsive_offset: "on",
        elementdelay: "0.05",
      },
      style: {
        zIndex: 5,
        whiteSpace: "nowrap",
        position: "relative",
        color: "#fff",
        fontWeight: 700,
        letterSpacing: "3.15px",
        fontFamily: "var(--font-body)",
        textTransform: "uppercase",
      },
    },
    title: {
      className: "tp-caption NotGeneric-Title tp-resizeme rs-parallaxlevel-0",
      data: {
        x: "['center','center','center','center']",
        hoffset: "['0','0','0','0']",
        y: "['middle','middle','middle','middle']",
        voffset: "['42','38','34','22']",
        fontsize: "['50','48','44','32']",
        lineheight: "['60','56','52','40']",
        width: "none",
        height: "none",
        whitespace: "nowrap",
        transform_idle: "o:1;",
        transform_in:
          "x:[105%];z:0;rX:45deg;rY:0deg;rZ:90deg;sX:1;sY:1;skX:0;skY:0;s:2000;e:Power4.easeInOut;",
        transform_out:
          "y:[100%];s:1000;e:Power2.easeInOut;s:1000;e:Power2.easeInOut;",
        mask_in: "x:0px;y:0px;s:inherit;e:inherit;",
        mask_out: "x:inherit;y:inherit;s:inherit;e:inherit;",
        start: "1000",
        splitin: "chars",
        splitout: "none",
        responsive_offset: "on",
        elementdelay: "0.05",
      },
      style: {
        zIndex: 5,
        whiteSpace: "nowrap",
        position: "relative",
        color: "#fff",
        fontWeight: 700,
        letterSpacing: "3.15px",
        fontFamily: "var(--font-body)",
        textTransform: "uppercase",
      },
    },
    subTitle: {
      className:
        "tp-caption NotGeneric-SubTitle tp-resizeme rs-parallaxlevel-0",
      data: {
        x: "['center','center','center','center']",
        hoffset: "['0','0','0','0']",
        y: "['middle','middle','middle','middle']",
        voffset: "['124','118','112','88']",
        fontsize: "['44','42','38','30']",
        lineheight: "['54','50','46','38']",
        width: "none",
        height: "none",
        whitespace: "nowrap",
        transform_idle: "o:1;",
        transform_in:
          "y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power4.easeInOut;",
        transform_out:
          "y:[100%];s:1000;e:Power2.easeInOut;s:1000;e:Power2.easeInOut;",
        mask_in: "x:0px;y:[100%];s:inherit;e:inherit;",
        mask_out: "x:inherit;y:inherit;s:inherit;e:inherit;",
        start: "1500",
        splitin: "none",
        splitout: "none",
        responsive_offset: "on",
      },
      style: {
        zIndex: 6,
        whiteSpace: "nowrap",
        position: "relative",
        color: "#fff",
        fontWeight: 700,
        letterSpacing: "3.15px",
        fontFamily: "var(--font-body)",
        textTransform: "uppercase",
      },
    },
    btn: {
      className:
        "tp-caption NotGeneric-Title tp-resizeme rs-parallaxlevel-0 slide-btn",
      data: {
        x: "['center','center','center','center']",
        hoffset: "['0','0','0','0']",
        y: "['top','top','top','top']",
        voffset: "['625','625','625','625']",
        fontsize: "['70','70','70','12']",
        lineheight: "['70','70','70','90']",
        width: "none",
        height: "none",
        whitespace: "normal",
        transform_idle: "o:1;",
        transform_in:
          "y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power4.easeInOut;",
        transform_out:
          "y:[100%];s:1000;e:Power2.easeInOut;s:1000;e:Power2.easeInOut;",
        mask_in: "x:0px;y:[100%];s:inherit;e:inherit;",
        mask_out: "x:inherit;y:inherit;s:inherit;e:inherit;",
        start: "1500",
        splitin: "none",
        splitout: "none",
        responsive_offset: "on",
      },
      style: { zIndex: 6, position: "relative" },
    },
  },
};

const layerAttrs = (() => {
  const resolved =
    SLIDER_LAYER_ATTRS_BY_PRESET[SLIDER_CAPTION_ANIMATION_PRESET];
  if (resolved === undefined) {
    throw new Error(
      `Unknown SLIDER_CAPTION_ANIMATION_PRESET: ${SLIDER_CAPTION_ANIMATION_PRESET}`,
    );
  }
  return resolved;
})();

const liData = {
  transition: "zoomout",
  slotamount: "default",
  easein: "easeInOut",
  easeout: "easeInOut",
  masterspeed: "2000",
  rotate: "0",
  fstransition: "fade",
  fsmasterspeed: "1500",
  fsslotamount: "7",
};

const imgData = {
  bgposition: "center center",
  bgfit: "cover",
  bgrepeat: "no-repeat",
  bgparallax: "10",
  className: "rev-slidebg",
  noRetina: true,
};

function dataAttrs(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      "data-" + k.replace(/([A-Z])/g, (m) => "_" + m.toLowerCase()),
      v,
    ]),
  );
}

function SliderSection() {
  const { t } = useTranslation("home");

  useEffect(() => {
    const sliderId = "home-slider1";
    const sliderElement = document.getElementById(sliderId);
    if (!sliderElement) return;

    const options = {
      sliderType: "standard",
      sliderLayout: "auto",
      delay: 6000,
      navigation: { arrows: { enable: true, style: "uranus" } },
      gridwidth: 1900,
      gridheight: 980,
    };

    const maxWaitMs = 8000;
    const pollIntervalMs = 150;

    let cancelled = false;
    let intervalId;
    const startedAt = Date.now();

    const tryInit = () => {
      if (cancelled) return true;
      const $ = window.$;
      if (typeof $ === "undefined") return false;

      const $el = $(`#${sliderId}`);
      if (!$el.length) return false;
      if ($el.hasClass("revslider-initialised")) return true;

      const canInit =
        typeof $el.revolution === "function" ||
        (typeof $.fn !== "undefined" && typeof $.fn.revolution === "function");

      if (!canInit) return false;

      $el.revolution(options);
      return true;
    };

    intervalId = setInterval(() => {
      const done = tryInit() || Date.now() - startedAt >= maxWaitMs;
      if (done) {
        clearInterval(intervalId);
      }
    }, pollIntervalMs);

    tryInit();

    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      id="home-revslider"
      className="slider-section container-fluid no-padding"
    >
      <div className="rev_slider_wrapper">
        <div id="home-slider1" className="rev_slider" data-version="5.0">
          <ul>
            {slideData.map((slide) => (
              <li
                key={slide.img}
                data-transition={liData.transition}
                data-slotamount={liData.slotamount}
                data-easein={liData.easein}
                data-easeout={liData.easeout}
                data-masterspeed={liData.masterspeed}
                data-rotate={liData.rotate}
                data-fstransition={liData.fstransition}
                data-fsmasterspeed={liData.fsmasterspeed}
                data-fsslotamount={liData.fsslotamount}
              >
                <img
                  src={slide.img}
                  alt="slider"
                  data-bgposition={imgData.bgposition}
                  data-bgfit={imgData.bgfit}
                  data-bgrepeat={imgData.bgrepeat}
                  data-bgparallax={imgData.bgparallax}
                  className={imgData.className}
                  data-no-retina
                />
                <div className="slider-overlay" aria-hidden="true" />
                <div
                  id={slide.layerIds[0]}
                  className={layerAttrs.preTitle.className}
                  {...dataAttrs(layerAttrs.preTitle.data)}
                  style={layerAttrs.preTitle.style}
                >
                  {t(slide.pretitleKey)}
                </div>
                <div
                  id={slide.layerIds[1]}
                  className={layerAttrs.title.className}
                  {...dataAttrs(layerAttrs.title.data)}
                  style={layerAttrs.title.style}
                >
                  {t(slide.titleKey)}
                </div>
                <div
                  id={slide.layerIds[2]}
                  className={layerAttrs.subTitle.className}
                  {...dataAttrs(layerAttrs.subTitle.data)}
                  style={layerAttrs.subTitle.style}
                >
                  {t(slide.subtitleKey)}
                </div>
                <div
                  id={slide.layerIds[3]}
                  className={layerAttrs.btn.className}
                  {...dataAttrs(layerAttrs.btn.data)}
                  style={layerAttrs.btn.style}
                >
                  <Link to="/about" title={t("slider.cta")}>
                    {t("slider.cta")}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <span className="goto-next">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <i className="icon icon-Mouse bounce" aria-hidden="true"></i>
        </a>
      </span>
    </div>
  );
}

export default SliderSection;
