export const SLIDER_CAPTION_ANIMATION_PRESET = "calm";

const SLIDER_IMAGES = [
  "sliderFirst.jpg",
  "DSC09468.JPG",
  "kopula.jpg",
  "zima.jpg",
];

export function buildHomeSliderSlideData() {
  return SLIDER_IMAGES.map((filename, i) => ({
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
}

export const SLIDER_LAYER_ATTRS_BY_PRESET = {
  calm: {
    preTitle: {
      className:
        "tp-caption NotGeneric-Title tp-resizeme rs-parallaxlevel-0 slider-pretitle",
      data: {
        x: "['center','center','center','center']",
        hoffset: "['0','0','0','0']",
        y: "['middle','middle','middle','middle']",
        voffset: "['-132','-128','-96','-72']",
        fontsize: "['96','92','64','48']",
        lineheight: "['108','100','72','54']",
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
        visibility: "['on','on','on','off','off']",
        responsive_offset: "on",
      },
    },
    title: {
      className: "tp-caption NotGeneric-Title tp-resizeme rs-parallaxlevel-0",
      data: {
        x: "['center','center','center','center']",
        hoffset: "['0','0','0','0']",
        y: "['middle','middle','middle','middle']",
        voffset: "['42','38','28','20']",
        fontsize: "['50','48','34','26']",
        lineheight: "['60','56','42','32']",
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
        visibility: "['on','on','on','off','off']",
        responsive_offset: "on",
      },
    },
    subTitle: {
      className:
        "tp-caption NotGeneric-SubTitle tp-resizeme rs-parallaxlevel-0",
      data: {
        x: "['center','center','center','center']",
        hoffset: "['0','0','0','0']",
        y: "['middle','middle','middle','middle']",
        voffset: "['124','118','84','64']",
        fontsize: "['44','42','28','22']",
        lineheight: "['54','50','36','28']",
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
        visibility: "['on','on','on','off','off']",
        responsive_offset: "on",
      },
    },
    btn: {
      className:
        "tp-caption NotGeneric-Title tp-resizeme rs-parallaxlevel-0 slide-btn",
      data: {
        x: "['center','center','center','center']",
        hoffset: "['0','0','0','0']",
        y: "['top','top','top','top']",
        voffset: "['678','672','470','400']",
        fontsize: "['70','70','12','12']",
        lineheight: "['70','70','14','90']",
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
        visibility: "['on','on','on','off','off']",
        responsive_offset: "on",
      },
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
        voffset: "['-132','-128','-96','-72']",
        fontsize: "['96','92','64','48']",
        lineheight: "['108','100','72','54']",
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
        visibility: "['on','on','on','off','off']",
        responsive_offset: "on",
        elementdelay: "0.05",
      },
    },
    title: {
      className: "tp-caption NotGeneric-Title tp-resizeme rs-parallaxlevel-0",
      data: {
        x: "['center','center','center','center']",
        hoffset: "['0','0','0','0']",
        y: "['middle','middle','middle','middle']",
        voffset: "['42','38','28','20']",
        fontsize: "['50','48','34','26']",
        lineheight: "['60','56','42','32']",
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
        visibility: "['on','on','on','off','off']",
        responsive_offset: "on",
        elementdelay: "0.05",
      },
    },
    subTitle: {
      className:
        "tp-caption NotGeneric-SubTitle tp-resizeme rs-parallaxlevel-0",
      data: {
        x: "['center','center','center','center']",
        hoffset: "['0','0','0','0']",
        y: "['middle','middle','middle','middle']",
        voffset: "['124','118','84','64']",
        fontsize: "['44','42','28','22']",
        lineheight: "['54','50','36','28']",
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
        visibility: "['on','on','on','off','off']",
        responsive_offset: "on",
      },
    },
    btn: {
      className:
        "tp-caption NotGeneric-Title tp-resizeme rs-parallaxlevel-0 slide-btn",
      data: {
        x: "['center','center','center','center']",
        hoffset: "['0','0','0','0']",
        y: "['top','top','top','top']",
        voffset: "['678','672','420','350']",
        fontsize: "['70','70','12','12']",
        lineheight: "['70','70','14','90']",
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
        visibility: "['on','on','on','off','off']",
        responsive_offset: "on",
      },
    },
  },
};

export const sliderLayerAttrs = (() => {
  const resolved =
    SLIDER_LAYER_ATTRS_BY_PRESET[SLIDER_CAPTION_ANIMATION_PRESET];
  if (resolved === undefined) {
    throw new Error(
      `Unknown SLIDER_CAPTION_ANIMATION_PRESET: ${SLIDER_CAPTION_ANIMATION_PRESET}`,
    );
  }
  return resolved;
})();

export function sliderRevolutionDataAttrs(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      "data-" + k.replace(/([A-Z])/g, (m) => "_" + m.toLowerCase()),
      v,
    ]),
  );
}

const SLIDER_DESKTOP_TRANSITION = "zoomout";
const SLIDER_MOBILE_TRANSITION = "fade";
const SLIDER_MOBILE_MAX_WIDTH_PX = 767;

export function isSliderMobileViewport() {
  if (typeof window === "undefined") {
    throw new Error("isSliderMobileViewport requires window");
  }
  return window.matchMedia(`(max-width: ${SLIDER_MOBILE_MAX_WIDTH_PX}px)`)
    .matches;
}

export function getSliderSlideTransition() {
  return isSliderMobileViewport()
    ? SLIDER_MOBILE_TRANSITION
    : SLIDER_DESKTOP_TRANSITION;
}

export function getSliderMobileMinHeightPx() {
  if (typeof document === "undefined") {
    throw new Error("getSliderMobileMinHeightPx requires document");
  }
  const probe = document.createElement("div");
  probe.style.cssText =
    "position:absolute;visibility:hidden;pointer-events:none;height:var(--slider-mobile-min-height)";
  document.documentElement.append(probe);
  const heightPx = probe.offsetHeight;
  probe.remove();
  if (heightPx <= 0) {
    throw new Error("getSliderMobileMinHeightPx: invalid height");
  }
  return heightPx;
}

export function buildSliderRevolutionOptions() {
  const options = { ...SLIDER_REVOLUTION_OPTIONS };
  if (isSliderMobileViewport()) {
    options.minHeight = getSliderMobileMinHeightPx();
  }
  return options;
}

export function syncSliderMobileBackgroundFill(sliderElement) {
  if (!isSliderMobileViewport()) {
    return;
  }
  const $ = window.$;
  if (typeof $ === "undefined") {
    throw new Error("syncSliderMobileBackgroundFill requires jQuery");
  }
  const $el = $(sliderElement);
  const $wrapper = $el.closest(".rev_slider_wrapper");
  if (!$wrapper.length) {
    throw new Error("syncSliderMobileBackgroundFill: missing rev_slider_wrapper");
  }
  const heightPx = $wrapper.outerHeight();
  if (heightPx <= 0) {
    throw new Error("syncSliderMobileBackgroundFill: invalid wrapper height");
  }
  const fillCss = {
    width: "100%",
    height: heightPx,
    minHeight: heightPx,
    opacity: 1,
  };
  $el
    .find(".slotholder, .tp-bgimg.defaultimg")
    .css(fillCss);
}

export const sliderSlideLiData = {
  transition: SLIDER_DESKTOP_TRANSITION,
  slotamount: "default",
  easein: "easeInOut",
  easeout: "easeInOut",
  masterspeed: "2000",
  rotate: "0",
  fstransition: "fade",
  fsmasterspeed: "1500",
  fsslotamount: "7",
};

export const sliderSlideImgData = {
  bgposition: "center center",
  bgfit: "cover",
  bgrepeat: "no-repeat",
  bgparallax: "10",
  className: "rev-slidebg",
  noRetina: true,
};

export const SLIDER_REVOLUTION_OPTIONS = {
  sliderType: "standard",
  sliderLayout: "auto",
  delay: 6000,
  spinner: "off",
  navigation: { arrows: { enable: true, style: "uranus" } },
  responsiveLevels: [1920, 1200, 992, 768, 480],
  gridwidth: [1900, 1200, 992, 768, 480],
  gridheight: [980, 820, 700, 620, 960],
};
