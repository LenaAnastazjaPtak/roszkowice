import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageBanner from '../components/PageBanner'

const DEFAULT_MAP_ADDRESS = 'Roszkowice 57, 46-220 Roszkowice'
const DEFAULT_MAP_LAT = 50.3636
const DEFAULT_MAP_LNG = 18.4236
const DEFAULT_MAP_ZOOM = 15

function getMapConfig() {
  const address = import.meta.env.VITE_MAP_ADDRESS ?? DEFAULT_MAP_ADDRESS
  const lat = parseFloat(import.meta.env.VITE_MAP_LAT, 10)
  const lng = parseFloat(import.meta.env.VITE_MAP_LNG, 10)
  const zoom = parseInt(import.meta.env.VITE_MAP_ZOOM, 10)
  return {
    address,
    lat: Number.isNaN(lat) ? DEFAULT_MAP_LAT : lat,
    lng: Number.isNaN(lng) ? DEFAULT_MAP_LNG : lng,
    zoom: Number.isNaN(zoom) ? DEFAULT_MAP_ZOOM : zoom
  }
}

function getMapScriptUrl() {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  if (!key) return null
  return `https://maps.googleapis.com/maps/api/js?key=${key}`
}

function ContactPage() {
  const { t } = useTranslation('contact')
  const [mapError, setMapError] = useState(false)

  const handleInvalid = useCallback(
    (e) => {
      const el = e.target
      if (el.validity.valueMissing) {
        el.setCustomValidity(t('validationRequired'))
      } else if (el.validity.typeMismatch) {
        el.setCustomValidity(t('validationEmail'))
      } else if (el.validity.tooLong) {
        el.setCustomValidity(t('validationTooLong'))
      } else {
        el.setCustomValidity('')
      }
    },
    [t]
  )

  const handleInput = useCallback((e) => {
    e.target.setCustomValidity('')
  }, [])

  const mapConfig = getMapConfig()
  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT
  if (!formspreeEndpoint) {
    throw new Error('Missing required env var: VITE_FORMSPREE_ENDPOINT')
  }

  useEffect(() => {
    let cancelled = false
    const setErrorOnce = () => {
      if (cancelled) return
      setMapError(true)
    }

    const scriptBaseUrl = getMapScriptUrl()
    if (!scriptBaseUrl) {
      setErrorOnce()
      return
    }

    const callbackName = 'initContactMap'

    const initMap = () => {
      if (!window.google?.maps) return
      const el = document.getElementById('map-canvas-contact')
      if (!el) return

      const myLatlng = new window.google.maps.LatLng(mapConfig.lat, mapConfig.lng)
      const mapOptions = {
        zoom: mapConfig.zoom,
        center: myLatlng,
        scrollwheel: true,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        fullscreenControl: false
      }

      const map = new window.google.maps.Map(el, mapOptions)
      const infowindow = new window.google.maps.InfoWindow({ content: mapConfig.address })
      const marker = new window.google.maps.Marker({
        position: myLatlng,
        map
      })
      window.google.maps.event.addListener(marker, 'click', () => infowindow.open(map, marker))
    }

    if (window.google?.maps) {
      initMap()
      return
    }

    const prevGmAuthFailure = window.gm_authFailure
    window[callbackName] = () => {
      if (cancelled) return
      initMap()
    }
    window.gm_authFailure = () => setErrorOnce()

    const scriptUrl = scriptBaseUrl.includes('callback=')
      ? scriptBaseUrl
      : `${scriptBaseUrl}&callback=${callbackName}`

    const script = document.createElement('script')
    script.src = scriptUrl
    script.async = true
    script.defer = true
    script.onload = () => {
      if (cancelled) return
      initMap()
    }
    script.onerror = () => setErrorOnce()
    document.head.appendChild(script)

    return () => {
      cancelled = true
      window[callbackName] = undefined
      window.gm_authFailure = prevGmAuthFailure
      if (script.parentNode) script.parentNode.removeChild(script)
    }
  }, [])

  return (
    <>
      <PageBanner title={t('title')} image="/images/roszkowice/zewn/jesien.jpg" />
      <div className="section-padding"></div>
      <div className="container-fluid no-padding contact-section">
        <div className="container">
          <div className="contact-info">
            <div className="col-md-4 col-sm-4 col-xs-12">
              <i><img src="/images/roszkowice/other/contact-info1.png" alt={t('contactInfoAlt')} /></i>
              <h3>{t('locationTitle')}</h3>
              <p>{mapConfig.address}</p>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12">
              <i><img src="/images/roszkowice/other/contact-info2.png" alt={t('contactInfoAlt')} /></i>
              <h3>{t('contactTitle')}</h3>
              <p><a href="tel:+48795000596">+48 795 000 596</a></p>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12">
              <i><img src="/images/roszkowice/other/contact-info3.png" alt={t('contactInfoAlt')} /></i>
              <h3>{t('emailTitle')}</h3>
              <p><a href="mailto:palac.roszkowice@gmail.com">palac.roszkowice@gmail.com</a></p>
            </div>
          </div>
          <div className="contact-form">
            <h3>{t('formTitle')}</h3>
            <p>{t('formSubtitle')}</p>
            <form action={formspreeEndpoint} method="POST">
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="form-control" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }} aria-hidden="true" />
              <div className="row">
                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                  <input type="text" name="contact-fname" id="input_fname" required placeholder={t('firstName')} className="form-control" maxLength={100} autoComplete="given-name" onInvalid={handleInvalid} onInput={handleInput} />
                  <input type="text" name="contact-lname" id="input_lname" required placeholder={t('lastName')} className="form-control" maxLength={100} autoComplete="family-name" onInvalid={handleInvalid} onInput={handleInput} />
                  <input type="email" name="contact-email" id="input_email" required placeholder={t('email')} className="form-control" maxLength={254} autoComplete="email" onInvalid={handleInvalid} onInput={handleInput} />
                  <input type="text" name="contact-subject" id="input_subject" required placeholder={t('subject')} className="form-control" maxLength={200} onInvalid={handleInvalid} onInput={handleInput} />
                </div>
                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                  <textarea name="contact-message" id="textarea_message" placeholder={t('message')} rows="4" className="form-control" required maxLength={5000} onInvalid={handleInvalid} onInput={handleInput}></textarea>
                  <button id="btn_submit" type="submit" title={t('submit')}>{t('submit')}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="padding-100"></div>
      <div className="container-fluid no-padding map-section">
        {mapError ? (
          <div className="map-canvas" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300, background: '#e8e8e8' }}>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapConfig.address)}`} target="_blank" rel="noopener noreferrer">
              {t('openInGoogleMaps')}: {mapConfig.address}
            </a>
          </div>
        ) : (
          <div id="map-canvas-contact" className="map-canvas" data-lat={mapConfig.lat} data-lng={mapConfig.lng} data-string={mapConfig.address} data-zoom={mapConfig.zoom}></div>
        )}
      </div>
    </>
  )
}

export default ContactPage
