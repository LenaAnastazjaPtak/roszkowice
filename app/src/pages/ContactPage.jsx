import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

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
  const [submitStatus, setSubmitStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [mapError, setMapError] = useState(false)

  const mapConfig = getMapConfig()

  useEffect(() => {
    const scriptUrl = getMapScriptUrl()
    if (!scriptUrl) {
      setMapError(true)
      return
    }

    const initMap = () => {
      if (window.initContactMap) {
        window.initContactMap()
        return
      }
      const el = document.getElementById('map-canvas-contact')
      if (!el || !window.google) return
      const lat = parseFloat(el.getAttribute('data-lat'), 10)
      const lng = parseFloat(el.getAttribute('data-lng'), 10)
      if (Number.isNaN(lat) || Number.isNaN(lng)) return
      const contentString = el.getAttribute('data-string')
      const zoom = parseInt(el.getAttribute('data-zoom'), 10) || mapConfig.zoom
      const myLatlng = new window.google.maps.LatLng(lat, lng)
      const mapOptions = {
        zoom,
        center: myLatlng,
        scrollwheel: true,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        fullscreenControl: false
      }
      const map = new window.google.maps.Map(el, mapOptions)
      const infowindow = new window.google.maps.InfoWindow({ content: contentString })
      const marker = new window.google.maps.Marker({
        position: myLatlng,
        map
      })
      window.google.maps.event.addListener(marker, 'click', () => infowindow.open(map, marker))
    }

    if (window.google && window.google.maps) {
      initMap()
      return
    }
    const script = document.createElement('script')
    script.src = scriptUrl
    script.async = true
    script.defer = true
    script.onload = () => setTimeout(initMap, 100)
    script.onerror = () => setMapError(true)
    window.gm_authFailure = () => setMapError(true)
    document.head.appendChild(script)
    return () => {
      delete window.gm_authFailure
      if (script.parentNode) script.parentNode.removeChild(script)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitStatus(null)
    const form = e.target
    const data = new FormData(form)
    const body = {
      'contact-fname': data.get('contact-fname'),
      'contact-lname': data.get('contact-lname'),
      'contact-email': data.get('contact-email'),
      'contact-subject': data.get('contact-subject'),
      'contact-message': data.get('contact-message')
    }
    const empty = Object.entries(body).some(([, v]) => !String(v).trim())
    if (empty) {
      setSubmitStatus({ type: 'error', msg: t('fillAll') })
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(body).toString()
      })
      const result = await res.json()
      setSubmitStatus({ type: result.type, msg: result.msg })
      if (result.type === 'success') form.reset()
    } catch {
      setSubmitStatus({ type: 'error', msg: t('error') })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="container-fluid no-padding page-banner">
        <div className="container">
          <h3>{t('title')}</h3>
        </div>
      </div>
      <div className="section-padding"></div>
      <div className="container-fluid no-padding contact-section">
        <div className="container">
          <div className="contact-info">
            <div className="col-md-4 col-sm-4 col-xs-12">
              <i><img src="/images/contact-info1.png" alt={t('contactInfoAlt')} /></i>
              <h3>{t('locationTitle')}</h3>
              <p>{mapConfig.address}</p>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12">
              <i><img src="/images/contact-info2.png" alt={t('contactInfoAlt')} /></i>
              <h3>{t('contactTitle')}</h3>
              <p><a href="tel:+48795000596">+48 795 000 596</a></p>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12">
              <i><img src="/images/contact-info3.png" alt={t('contactInfoAlt')} /></i>
              <h3>{t('emailTitle')}</h3>
              <p><a href="mailto:palac.roszkowice@gmail.com">palac.roszkowice@gmail.com</a></p>
            </div>
          </div>
          <div className="contact-form">
            <h3>{t('formTitle')}</h3>
            <p>{t('formSubtitle')}</p>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                  <input type="text" name="contact-fname" id="input_fname" required placeholder={t('firstName')} className="form-control" />
                  <input type="text" name="contact-lname" id="input_lname" required placeholder={t('lastName')} className="form-control" />
                  <input type="email" name="contact-email" id="input_email" required placeholder={t('email')} className="form-control" />
                  <input type="text" name="contact-subject" id="input_subject" required placeholder={t('subject')} className="form-control" />
                </div>
                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                  <textarea name="contact-message" id="textarea_message" placeholder={t('message')} rows="4" className="form-control" required></textarea>
                  <button id="btn_submit" type="submit" title={t('submit')} disabled={loading}>{t('submit')}</button>
                </div>
              </div>
              {submitStatus && (
                <div className={`alert-msg ${submitStatus.type === 'success' ? 'alert-msg-success' : 'alert-msg-failure'}`} id="alert-msg">
                  {submitStatus.msg}
                </div>
              )}
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
