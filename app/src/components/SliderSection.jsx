import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  buildHomeSliderSlideData,
  buildSliderRevolutionOptions,
  getSliderSlideTransition,
  isSliderMobileViewport,
  sliderLayerAttrs,
  sliderRevolutionDataAttrs,
  sliderSlideImgData,
  sliderSlideLiData,
  syncSliderMobileBackgroundFill,
} from "./sliderSectionConfig";
import SliderSlideMobileCaption from "./SliderSlideMobileCaption";

const slideData = buildHomeSliderSlideData();

function slideTitleSubtitleText(t, slide, separator) {
  return [t(slide.titleKey), t(slide.subtitleKey)]
    .map((s) => s.trim())
    .filter(Boolean)
    .join(separator);
}

function SliderSection() {
  const { t } = useTranslation("home");

  useEffect(() => {
    const sliderId = "home-slider1";
    const sliderElement = document.getElementById(sliderId);
    if (!sliderElement) return;

    const maxWaitMs = 8000;
    const pollIntervalMs = 150;

    let cancelled = false;
    let intervalId;
    const startedAt = Date.now();

    const syncMobileFill = () => {
      syncSliderMobileBackgroundFill(sliderElement);
    };

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

      $el.revolution(buildSliderRevolutionOptions());

      if (isSliderMobileViewport()) {
        syncMobileFill();
        $el.on(
          "revolution.slide.onloaded revolution.slide.onbeforeswap revolution.slide.onafterswap",
          syncMobileFill,
        );
      }

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
      const $ = window.$;
      if (typeof $ !== "undefined") {
        const $el = $(`#${sliderId}`);
        if ($el.length) {
          $el.off(
            "revolution.slide.onloaded revolution.slide.onbeforeswap revolution.slide.onafterswap",
            syncMobileFill,
          );
        }
      }
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
                data-transition={getSliderSlideTransition()}
                data-slotamount={sliderSlideLiData.slotamount}
                data-easein={sliderSlideLiData.easein}
                data-easeout={sliderSlideLiData.easeout}
                data-masterspeed={sliderSlideLiData.masterspeed}
                data-rotate={sliderSlideLiData.rotate}
                data-fstransition={sliderSlideLiData.fstransition}
                data-fsmasterspeed={sliderSlideLiData.fsmasterspeed}
                data-fsslotamount={sliderSlideLiData.fsslotamount}
              >
                <img
                  src={slide.img}
                  alt={slideTitleSubtitleText(t, slide, " — ")}
                  data-bgposition={sliderSlideImgData.bgposition}
                  data-bgfit={sliderSlideImgData.bgfit}
                  data-bgrepeat={sliderSlideImgData.bgrepeat}
                  data-bgparallax={sliderSlideImgData.bgparallax}
                  className={sliderSlideImgData.className}
                  data-no-retina
                />
                <div className="slider-overlay" aria-hidden="true" />
                <SliderSlideMobileCaption
                  pretitle={t(slide.pretitleKey)}
                  tagline={slideTitleSubtitleText(t, slide, " ")}
                  ctaLabel={t("slider.cta")}
                  ctaTitle={t("slider.cta")}
                />
                <div
                  id={slide.layerIds[0]}
                  className={`${sliderLayerAttrs.preTitle.className} slider-layer-desktop`}
                  {...sliderRevolutionDataAttrs(sliderLayerAttrs.preTitle.data)}
                >
                  {t(slide.pretitleKey)}
                </div>
                <div
                  id={slide.layerIds[1]}
                  className={`${sliderLayerAttrs.title.className} slider-layer-desktop`}
                  {...sliderRevolutionDataAttrs(sliderLayerAttrs.title.data)}
                >
                  {t(slide.titleKey)}
                </div>
                <div
                  id={slide.layerIds[2]}
                  className={`${sliderLayerAttrs.subTitle.className} slider-layer-desktop`}
                  {...sliderRevolutionDataAttrs(sliderLayerAttrs.subTitle.data)}
                >
                  {t(slide.subtitleKey)}
                </div>
                <div
                  id={slide.layerIds[3]}
                  className={`${sliderLayerAttrs.btn.className} slider-layer-desktop`}
                  {...sliderRevolutionDataAttrs(sliderLayerAttrs.btn.data)}
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
