import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const slideData = [
  { img: '/images/roszkowice/zima.jpg', layerIds: ['slide-layer-1', 'slide-layer-2', 'slide-layer-3', 'slide-layer-4'] },
  { img: '/images/roszkowice/kopula.jpg', layerIds: ['slide-layer-5', 'slide-layer-6', 'slide-layer-7', 'slide-layer-8'] },
  { img: '/images/roszkowice/park.jpg', layerIds: ['slide-layer-9', 'slide-layer-10', 'slide-layer-11', 'slide-layer-12'] }
]

const layerAttrs = {
  title: {
    className: 'tp-caption NotGeneric-Title tp-resizeme rs-parallaxlevel-0',
    data: {
      x: "['center','center','center','center']", hoffset: "['0','0','0','0']",
      y: "['middle','middle','middle','middle']", voffset: "['0','0','0','0']",
      fontsize: "['70','70','70','45']", lineheight: "['100','70','70','60']",
      width: 'none', height: 'none', whitespace: 'nowrap',
      transform_idle: 'o:1;',
      transform_in: 'x:[105%];z:0;rX:45deg;rY:0deg;rZ:90deg;sX:1;sY:1;skX:0;skY:0;s:2000;e:Power4.easeInOut;',
      transform_out: 'y:[100%];s:1000;e:Power2.easeInOut;s:1000;e:Power2.easeInOut;',
      mask_in: 'x:0px;y:0px;s:inherit;e:inherit;', mask_out: 'x:inherit;y:inherit;s:inherit;e:inherit;',
      start: '1000', splitin: 'chars', splitout: 'none', responsive_offset: 'on', elementdelay: '0.05'
    },
    style: { zIndex: 5, whiteSpace: 'nowrap', position: 'relative', color: '#fff', fontWeight: 700, letterSpacing: '3.15px', fontFamily: "'PT Serif', serif", textTransform: 'uppercase' }
  },
  subTitle: {
    className: 'tp-caption NotGeneric-SubTitle tp-resizeme rs-parallaxlevel-0',
    data: {
      x: "['center','center','center','center']", hoffset: "['0','0','0','0']",
      y: "['middle','middle','middle','middle']", voffset: "['90','90','90','90']",
      fontsize: "['70','70','70','45']", lineheight: "['100','70','70','60']",
      width: 'none', height: 'none', whitespace: 'nowrap',
      transform_idle: 'o:1;',
      transform_in: 'y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power4.easeInOut;',
      transform_out: 'y:[100%];s:1000;e:Power2.easeInOut;s:1000;e:Power2.easeInOut;',
      mask_in: 'x:0px;y:[100%];s:inherit;e:inherit;', mask_out: 'x:inherit;y:inherit;s:inherit;e:inherit;',
      start: '1500', splitin: 'none', splitout: 'none', responsive_offset: 'on'
    },
    style: { zIndex: 6, whiteSpace: 'nowrap', position: 'relative', color: '#fff', fontWeight: 700, letterSpacing: '3.15px', fontFamily: "'PT Serif', serif", textTransform: 'uppercase' }
  },
  btn: {
    className: 'tp-caption NotGeneric-Title tp-resizeme rs-parallaxlevel-0 slide-btn',
    data: {
      x: "['center','center','center','center']", hoffset: "['0','0','0','0']",
      y: "['top','top','top','top']", voffset: "['625','625','625','625']",
      fontsize: "['70','70','70','12']", lineheight: "['70','70','70','90']",
      width: 'none', height: 'none', whitespace: 'noraml',
      transform_idle: 'o:1;',
      transform_in: 'y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power4.easeInOut;',
      transform_out: 'y:[100%];s:1000;e:Power2.easeInOut;s:1000;e:Power2.easeInOut;',
      mask_in: 'x:0px;y:[100%];s:inherit;e:inherit;', mask_out: 'x:inherit;y:inherit;s:inherit;e:inherit;',
      start: '1500', splitin: 'none', splitout: 'none', responsive_offset: 'on'
    },
    style: { zIndex: 6, position: 'relative' }
  },
  icon: {
    className: 'tp-caption NotGeneric-Icon tp-resizeme rs-parallaxlevel-1 icon-img',
    data: {
      x: "['center','center','center','center']", hoffset: "['0','0','0','0']",
      y: "['middle','middle','middle','middle']", voffset: "['-90','-90','-90','-90']",
      fontsize: "['20','60','60','60']", lineheight: "['70','70','70','90']",
      width: 'none', height: 'none', whitespace: 'nowrap',
      transform_idle: 'o:1;', style_hover: 'cursor:default;',
      transform_in: 'y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:1500;e:Power4.easeInOut;',
      transform_out: 'y:[100%];s:1000;e:Power2.easeInOut;s:1000;e:Power2.easeInOut;',
      mask_in: 'x:0px;y:[100%];s:inherit;e:inherit;', mask_out: 'x:inherit;y:inherit;s:inherit;e:inherit;',
      start: '2000', splitin: 'none', splitout: 'none', responsive_offset: 'on'
    },
    style: { zIndex: 7, whiteSpace: 'nowrap', fontWeight: 500, color: '#fff', letterSpacing: '1.4px', fontFamily: "'Poppins', sans-serif", textTransform: 'uppercase', lineHeight: '30px' }
  }
}

const liData = {
  transition: 'zoomout',
  slotamount: 'default',
  easein: 'easeInOut',
  easeout: 'easeInOut',
  masterspeed: '2000',
  rotate: '0',
  fstransition: 'fade',
  fsmasterspeed: '1500',
  fsslotamount: '7'
}

const imgData = {
  bgposition: 'center center',
  bgfit: 'cover',
  bgrepeat: 'no-repeat',
  bgparallax: '10',
  className: 'rev-slidebg',
  noRetina: true
}

function dataAttrs(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => ['data-' + k.replace(/([A-Z])/g, (m) => '_' + m.toLowerCase()), v])
  )
}

function SliderSection() {
  const { t } = useTranslation('home')

  useEffect(() => {
    const initSlider = () => {
      if (typeof window.$ === 'undefined' || !document.getElementById('home-slider1')) return
      const $el = window.$('#home-slider1')
      if ($el.length && !$el.hasClass('revslider-initialised')) {
        $el.revolution({
          sliderType: 'standard',
          sliderLayout: 'auto',
          delay: 6000,
          navigation: { arrows: { enable: true, style: 'uranus' } },
          gridwidth: 1900,
          gridheight: 980
        })
      }
    }
    const t = setTimeout(initSlider, 150)
    return () => clearTimeout(t)
  }, [])

  return (
    <div id="home-revslider" className="slider-section container-fluid no-padding">
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
                <div id={slide.layerIds[0]} className={layerAttrs.title.className} {...dataAttrs(layerAttrs.title.data)} style={layerAttrs.title.style}>
                  {t('slider.title')}
                </div>
                <div id={slide.layerIds[1]} className={layerAttrs.subTitle.className} {...dataAttrs(layerAttrs.subTitle.data)} style={layerAttrs.subTitle.style}>
                  {t('slider.subtitle')}
                </div>
                <div id={slide.layerIds[2]} className={layerAttrs.btn.className} {...dataAttrs(layerAttrs.btn.data)} style={layerAttrs.btn.style}>
                  <a style={{ fontWeight: 700, padding: '12px 37px', fontFamily: "'Poppins', sans-serif" }} href="#" title={t('slider.cta')}>{t('slider.cta')}</a>
                </div>
                <div id={slide.layerIds[3]} className={layerAttrs.icon.className} {...dataAttrs(layerAttrs.icon.data)} style={layerAttrs.icon.style}>
                  <span>{t('slider.since')}<img src="/images/slider.png" alt="slider" />1980</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <span className="goto-next">
        <a href="#welcome-section"><i className="icon icon-Mouse bounce" aria-hidden="true"></i></a>
      </span>
    </div>
  )
}

export default SliderSection
